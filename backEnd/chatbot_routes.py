from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from langchain_groq import ChatGroq
from datetime import datetime, timedelta
from collections import defaultdict
from sqlalchemy.orm import Session
from database import get_db, Project, Skill, About, Hero, Document
import os
import hashlib

router = APIRouter()

groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    print("Warning: GROQ_API_KEY not set. Chatbot will not work.")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    max_tokens=300,
    api_key=groq_api_key,
)

rate_limit_cache = defaultdict(list)
MAX_REQUESTS_PER_MINUTE = 10

conversation_memory = defaultdict(list)
MAX_MEMORY_LENGTH = 5

response_cache = {}
CACHE_EXPIRY_HOURS = 24


class ChatMessage(BaseModel):
    message: str
    conversation_id: str | None = None


class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    cached: bool = False


def check_rate_limit(ip_address: str):
    """Check if IP has exceeded rate limit"""
    now = datetime.now()

    rate_limit_cache[ip_address] = [
        ts for ts in rate_limit_cache[ip_address] if now - ts < timedelta(minutes=1)
    ]

    if len(rate_limit_cache[ip_address]) >= MAX_REQUESTS_PER_MINUTE:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please wait a moment before trying again.",
        )

    rate_limit_cache[ip_address].append(now)


def get_cache_key(message: str) -> str:
    """Generate cache key from message"""
    normalized = message.lower().strip()
    return hashlib.md5(normalized.encode()).hexdigest()


def get_cached_response(message: str) -> str | None:
    """Get cached response if available and not expired"""
    cache_key = get_cache_key(message)

    if cache_key in response_cache:
        cached_data = response_cache[cache_key]
        cached_time = cached_data["timestamp"]

        if datetime.now() - cached_time < timedelta(hours=CACHE_EXPIRY_HOURS):
            return cached_data["response"]
        else:
            del response_cache[cache_key]

    return None


def cache_response(message: str, response: str):
    """Cache a response"""
    cache_key = get_cache_key(message)
    response_cache[cache_key] = {"response": response, "timestamp": datetime.now()}


def fetch_portfolio_context(db: Session) -> str:
    """Fetch real-time data from database for RAG"""
    context_parts = []

    projects = db.query(Project).all()
    if projects:
        project_info = "Current Projects:\n"
        for proj in projects:
            project_info += f"- {proj.title}: {proj.desc}\n"
            if proj.github:
                project_info += f"  GitHub: {proj.github}\n"
            if proj.demo:
                project_info += f"  Demo: {proj.demo}\n"
        context_parts.append(project_info)

    skills = db.query(Skill).all()
    if skills:
        skills_by_category = {}
        for skill in skills:
            category = skill.category or "Other"
            if category not in skills_by_category:
                skills_by_category[category] = []
            skills_by_category[category].append(skill.name)

        skill_info = "Skills by Category:\n"
        for category, skill_list in skills_by_category.items():
            skill_info += f"- {category}: {', '.join(skill_list)}\n"
        context_parts.append(skill_info)

    about = db.query(About).first()
    if about:
        about_info = f"About:\n{about.content}\n"
        if about.education:
            about_info += "Education:\n"
            for edu in about.education:
                about_info += (
                    f"- {edu.get('degree', '')} at {edu.get('institution', '')}\n"
                )
        context_parts.append(about_info)

    hero = db.query(Hero).first()
    if hero:
        hero_info = f"Professional Title: {hero.title}\n{hero.subtitle}\n"
        context_parts.append(hero_info)

    documents = db.query(Document).all()
    if documents:
        doc_info = "Available Documents:\n"
        for doc in documents:
            doc_info += f"- {doc.type.upper()}: {doc.filename} (uploaded {doc.uploaded_at.strftime('%Y-%m-%d')})\n"
        doc_info += "Visitors can download these from the portfolio website.\n"
        context_parts.append(doc_info)

    return "\n".join(context_parts)


def get_system_prompt(db_context: str) -> str:
    """Generate system prompt with portfolio information"""
    return f"""You are an AI assistant for Tunji Paul's portfolio website. You help visitors learn about Tunji's background, skills, and projects.

REAL-TIME PORTFOLIO DATA (use this as your primary source):
{db_context}

Contact Information:
- Email: tunjipaul007@gmail.com
- GitHub: https://github.com/tunjipaul
- Portfolio: https://tunji-paul-portfolio.vercel.app
- LinkedIn: https://www.linkedin.com/in/paul-ogor-gmnse-9103601b1

Instructions:
- Be friendly, professional, and concise
- Answer questions using the REAL-TIME PORTFOLIO DATA above
- Keep responses to 2-3 sentences maximum
- If asked about availability or hiring, suggest using the contact form
- If you don't know something specific, suggest contacting Tunji directly
- Don't make up information - stick to the data provided

Remember: You're here to help visitors learn about Tunji and encourage them to reach out!"""


@router.post("/api/chatbot/message", response_model=ChatResponse)
async def chat(message: ChatMessage, request: Request, db: Session = Depends(get_db)):
    """
    Send a message to the AI chatbot

    - Rate limited to 10 requests per minute per IP
    - Maintains conversation context (last 5 messages)
    - Uses RAG to fetch real-time data from database
    - Caches responses for 24 hours to reduce API calls
    - Returns AI-generated response about the portfolio
    """

    client_ip = request.client.host
    check_rate_limit(client_ip)

    if not message.message or len(message.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    if len(message.message) > 500:
        raise HTTPException(
            status_code=400, detail="Message too long (max 500 characters)"
        )

    cached_response = get_cached_response(message.message)
    if cached_response:
        conversation_id = (
            message.conversation_id or f"{client_ip}_{datetime.now().timestamp()}"
        )
        return ChatResponse(
            response=cached_response, conversation_id=conversation_id, cached=True
        )

    conversation_id = (
        message.conversation_id or f"{client_ip}_{datetime.now().timestamp()}"
    )

    try:
        portfolio_context = fetch_portfolio_context(db)

        history = conversation_memory[conversation_id]

        messages = [{"role": "system", "content": get_system_prompt(portfolio_context)}]

        for msg in history[-MAX_MEMORY_LENGTH:]:
            messages.append(msg)

        messages.append({"role": "user", "content": message.message})

        response = llm.invoke(messages)
        ai_message = response.content

        cache_response(message.message, ai_message)

        conversation_memory[conversation_id].append(
            {"role": "user", "content": message.message}
        )
        conversation_memory[conversation_id].append(
            {"role": "assistant", "content": ai_message}
        )

        if len(conversation_memory[conversation_id]) > MAX_MEMORY_LENGTH * 2:
            conversation_memory[conversation_id] = conversation_memory[conversation_id][
                -MAX_MEMORY_LENGTH * 2 :
            ]

        return ChatResponse(
            response=ai_message, conversation_id=conversation_id, cached=False
        )

    except Exception as e:
        print(f"Chatbot error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Sorry, I'm having trouble responding right now. Please try again later.",
        )


@router.delete("/api/chatbot/clear/{conversation_id}")
async def clear_conversation(conversation_id: str):
    """Clear conversation history for a specific conversation"""
    if conversation_id in conversation_memory:
        del conversation_memory[conversation_id]
        return {"message": "Conversation cleared successfully"}
    return {"message": "Conversation not found"}


@router.get("/api/chatbot/cache/stats")
async def get_cache_stats():
    """Get cache statistics (for debugging)"""
    valid_cache = 0
    expired_cache = 0

    for cache_key, cached_data in response_cache.items():
        if datetime.now() - cached_data["timestamp"] < timedelta(
            hours=CACHE_EXPIRY_HOURS
        ):
            valid_cache += 1
        else:
            expired_cache += 1

    return {
        "total_cached": len(response_cache),
        "valid_cache": valid_cache,
        "expired_cache": expired_cache,
        "cache_expiry_hours": CACHE_EXPIRY_HOURS,
    }
