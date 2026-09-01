from fastapi import APIRouter, File, UploadFile, HTTPException, Form, Depends
from fastapi.responses import StreamingResponse
import io
from pathlib import Path
import re
from auth_utils import get_current_user
from database import get_db, Document
from sqlalchemy.orm import Session
from datetime import datetime, timezone

router = APIRouter()

# Security constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {".pdf"}
PDF_MAGIC_NUMBER = b"%PDF"


def sanitize_filename(filename: str) -> str:
    """Remove potentially dangerous characters from filename"""
    filename = re.sub(r"[^\w\s.-]", "", filename)
    filename = filename.lstrip(".")
    return filename


def validate_pdf_content(file_content: bytes) -> bool:
    """Validate that file content is actually a PDF by checking magic number"""
    return file_content.startswith(PDF_MAGIC_NUMBER)


@router.post("/api/resume/upload")
async def upload_document(
    file: UploadFile = File(...),
    type: str = Form(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload resume or CV (Admin only)
    - Requires JWT authentication
    - Only accepts PDF files
    - Maximum file size: 10MB
    - Validates file content
    - Stores in PostgreSQL database
    """

    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, detail=f"Only PDF files are allowed. Received: {file_ext}"
        )

    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    try:
        # Read file content
        content = await file.read()

        # Validate file size
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / 1024 / 1024}MB",
            )

        # Validate PDF content (magic number check)
        if not validate_pdf_content(content):
            raise HTTPException(
                status_code=400, detail="File content is not a valid PDF"
            )

        # Check if document already exists
        existing_doc = db.query(Document).filter(Document.type == type).first()

        if existing_doc:
            # Update existing document
            existing_doc.filename = sanitize_filename(file.filename)
            existing_doc.content = content
            existing_doc.size = len(content)
            existing_doc.updated_at = datetime.now(timezone.utc)
        else:
            # Create new document
            new_doc = Document(
                type=type,
                filename=sanitize_filename(file.filename),
                content=content,
                size=len(content),
            )
            db.add(new_doc)

        db.commit()

        return {
            "message": f"{type.upper()} uploaded successfully",
            "filename": sanitize_filename(file.filename),
            "type": type,
            "size": len(content),
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"File upload error: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to upload file. Please try again."
        )


@router.get("/api/resume/download/{type}")
async def download_document(type: str, db: Session = Depends(get_db)):
    """
    Download resume or CV (Public endpoint)
    """
    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    document = db.query(Document).filter(Document.type == type).first()

    if not document:
        raise HTTPException(status_code=404, detail=f"{type.upper()} not found")

    # Create a BytesIO object from the binary content
    pdf_stream = io.BytesIO(document.content)

    return StreamingResponse(
        pdf_stream,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="Tunji_Paul_{type.upper()}.pdf"'
        },
    )


@router.delete("/api/resume/delete/{type}")
async def delete_document(
    type: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete resume or CV (Admin only)
    """
    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    document = db.query(Document).filter(Document.type == type).first()

    if not document:
        raise HTTPException(status_code=404, detail=f"{type.upper()} not found")

    try:
        db.delete(document)
        db.commit()
        return {"message": f"{type.upper()} deleted successfully", "type": type}
    except Exception as e:
        db.rollback()
        print(f"File deletion error: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to delete file. Please try again."
        )


@router.get("/api/resume/current")
async def get_current_files(db: Session = Depends(get_db)):
    """
    Get information about currently uploaded files (Public endpoint)
    """
    resume_doc = db.query(Document).filter(Document.type == "resume").first()
    cv_doc = db.query(Document).filter(Document.type == "cv").first()

    return {
        "resume": resume_doc.filename if resume_doc else None,
        "cv": cv_doc.filename if cv_doc else None,
    }
