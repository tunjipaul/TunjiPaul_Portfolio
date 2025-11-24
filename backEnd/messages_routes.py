from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db, Message
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/messages", tags=["messages"])


# Pydantic Models
class MessageCreate(BaseModel):
    name: str = Field(..., min_length=1, example="John Doe")
    email: EmailStr = Field(..., example="john@example.com")
    subject: str = Field(..., min_length=1, example="Project Inquiry")
    message: str = Field(
        ..., min_length=1, example="Hi, I'm interested in your services..."
    )


class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class MessageUpdate(BaseModel):
    is_read: bool = Field(..., example=True)


# Email function
def send_email_notification(name: str, email: str, subject: str, message_content: str):
    """Send email notification to admin"""
    try:
        sender_email = os.getenv("SENDER_EMAIL")
        sender_password = os.getenv("SENDER_PASSWORD")
        receiver_email = os.getenv("ADMIN_EMAIL")

        if not all([sender_email, sender_password, receiver_email]):
            print(
                "Warning: Email credentials not configured. Message saved but email not sent."
            )
            return

        # Create email message
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = f"New Message: {subject}"

        body = f"""
        New message from your portfolio contact form:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message_content}
        
        ---
        Reply to: {email}
        """

        msg.attach(MIMEText(body, "plain"))

        # Send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print(f"✓ Email sent successfully to {receiver_email}")
    except Exception as e:
        print(f"Warning: Could not send email: {e}")


# Routes


@router.get("", response_model=list[MessageResponse])
def get_all_messages(db: Session = Depends(get_db)):
    """Get all messages (admin panel)"""
    messages = db.query(Message).order_by(Message.created_at.desc()).all()
    return messages


@router.get("/{message_id}", response_model=MessageResponse)
def get_message(message_id: int, db: Session = Depends(get_db)):
    """Get a specific message by ID"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def create_message(msg: MessageCreate, db: Session = Depends(get_db)):
    """Create a new message (from contact form)"""
    db_message = Message(
        name=msg.name, email=msg.email, subject=msg.subject, message=msg.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # Send email notification to admin
    send_email_notification(msg.name, msg.email, msg.subject, msg.message)

    return db_message


@router.put("/{message_id}", response_model=MessageResponse)
def update_message(
    message_id: int, msg_update: MessageUpdate, db: Session = Depends(get_db)
):
    """Mark message as read/unread"""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")

    db_message.is_read = msg_update.is_read
    db.commit()
    db.refresh(db_message)
    return db_message


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(message_id: int, db: Session = Depends(get_db)):
    """Delete a message"""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(db_message)
    db.commit()


class ReplyCreate(BaseModel):
    message_id: int
    recipient_email: str
    reply_text: str


@router.post("/reply", status_code=status.HTTP_200_OK)
def send_reply(reply: ReplyCreate, db: Session = Depends(get_db)):
    """Send a reply to a message"""
    try:
        sender_email = os.getenv("SENDER_EMAIL")
        sender_password = os.getenv("SENDER_PASSWORD")

        if not all([sender_email, sender_password]):
            raise HTTPException(
                status_code=500, detail="Email credentials not configured"
            )

        # Create email message
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = reply.recipient_email
        msg["Subject"] = "Re: Your message from portfolio"

        body = f"""
{reply.reply_text}

---
This is a reply to your message sent through the portfolio contact form.
Do not reply to this email. Contact me through the portfolio instead.
        """

        msg.attach(MIMEText(body, "plain"))

        # Send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print(f" Reply sent successfully to {reply.recipient_email}")
        return {"message": "Reply sent successfully"}

    except Exception as e:
        print(f" Error sending reply: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to send reply: {str(e)}")
