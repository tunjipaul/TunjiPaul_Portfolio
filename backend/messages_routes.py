from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db, Message
import os
from dotenv import load_dotenv
import resend
from auth_utils import get_current_user

load_dotenv()

router = APIRouter(prefix="/api/messages", tags=["messages"])


resend.api_key = os.getenv("RESEND_API_KEY")


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


class MessageUpdate(BaseModel):
    is_read: bool = Field(..., example=True)


def send_email_notification(name: str, email: str, subject: str, message_content: str):
    """Send email notification to admin using Resend"""
    try:
        receiver_email = os.getenv("ADMIN_EMAIL")

        if not receiver_email:
            print(
                "Warning: ADMIN_EMAIL not configured. Message saved but email not sent."
            )
            return

        if not resend.api_key:
            print(
                "Warning: RESEND_API_KEY not configured. Message saved but email not sent."
            )
            return

        params = {
            "from": "Portfolio Contact <onboarding@resend.dev>",  # Use this for testing
            "to": [receiver_email],
            "subject": f"New Portfolio Message: {subject}",
            "html": f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Message from Portfolio Contact Form</h2>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Subject:</strong> {subject}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555;">Message:</h3>
                        <p style="line-height: 1.6;">{message_content}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    
                    <p style="color: #666; font-size: 14px;">
                        <strong>Reply to:</strong> <a href="mailto:{email}">{email}</a>
                    </p>
                </div>
            """,
            "reply_to": email,  # Allows you to hit "reply" in your email client
        }

        response = resend.Emails.send(params)
        print(f"✓ Email sent successfully to {receiver_email} (ID: {response['id']})")

    except Exception as e:
        print(f"Warning: Could not send email: {e}")


@router.get("", response_model=list[MessageResponse])
def get_all_messages(
    db: Session = Depends(get_db), current_user: str = Depends(get_current_user)
):
    """Get all messages (admin panel)"""
    messages = db.query(Message).order_by(Message.created_at.desc()).all()
    return messages


@router.get("/{message_id}", response_model=MessageResponse)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
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
    message_id: int,
    msg_update: MessageUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
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
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
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
def send_reply(
    reply: ReplyCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    """Send a reply to a message using Resend"""
    try:
        if not resend.api_key:
            raise HTTPException(status_code=500, detail="RESEND_API_KEY not configured")

        params = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [reply.recipient_email],
            "subject": "Re: Your message from portfolio",
            "html": f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <p style="line-height: 1.6;">{reply.reply_text}</p>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    
                    <p style="color: #666; font-size: 12px;">
                        This is a reply to your message sent through the portfolio contact form.
                    </p>
                </div>
            """,
        }

        response = resend.Emails.send(params)
        print(
            f"✓ Reply sent successfully to {reply.recipient_email} (ID: {response['id']})"
        )
        return {"message": "Reply sent successfully", "email_id": response["id"]}

    except Exception as e:
        # Log detailed error server-side only
        print(f"✗ Error sending reply: {e}")
        # Return generic error to client
        raise HTTPException(
            status_code=500, detail="Failed to send reply. Please try again."
        )
