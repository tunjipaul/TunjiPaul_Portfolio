from fastapi import APIRouter, File, UploadFile, HTTPException, Form, Depends
from fastapi.responses import FileResponse
import os
import shutil
from pathlib import Path
import re
from auth_utils import get_current_user

router = APIRouter()


UPLOAD_DIR = Path("uploads/documents")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Security constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {".pdf"}
PDF_MAGIC_NUMBER = b"%PDF"


RESUME_PATH = UPLOAD_DIR / "resume.pdf"
CV_PATH = UPLOAD_DIR / "cv.pdf"


def sanitize_filename(filename: str) -> str:
    """Remove potentially dangerous characters from filename"""
    # Remove path separators and other dangerous characters
    filename = re.sub(r"[^\w\s.-]", "", filename)
    # Remove leading dots to prevent hidden files
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
):
    """
    Upload resume or CV (Admin only)
    - Requires JWT authentication
    - Only accepts PDF files
    - Maximum file size: 10MB
    - Validates file content
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

    file_path = RESUME_PATH if type == "resume" else CV_PATH

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

        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(content)

        return {
            "message": f"{type.upper()} uploaded successfully",
            "filename": sanitize_filename(file.filename),
            "type": type,
            "size": len(content),
        }
    except HTTPException:
        raise
    except Exception as e:
        # Log detailed error server-side only
        print(f"File upload error: {str(e)}")
        # Return generic error to client
        raise HTTPException(
            status_code=500, detail="Failed to upload file. Please try again."
        )


@router.get("/api/resume/download/{type}")
async def download_document(type: str):
    """
    Download resume or CV (Public endpoint)
    """
    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    file_path = RESUME_PATH if type == "resume" else CV_PATH

    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"{type.upper()} not found")

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=f"Tunji_Paul_{type.upper()}.pdf",
    )


@router.delete("/api/resume/delete/{type}")
async def delete_document(type: str, current_user: str = Depends(get_current_user)):
    """
    Delete resume or CV (Admin only)
    """
    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    file_path = RESUME_PATH if type == "resume" else CV_PATH

    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"{type.upper()} not found")

    try:
        os.remove(file_path)
        return {"message": f"{type.upper()} deleted successfully", "type": type}
    except Exception as e:
        # Log detailed error server-side only
        print(f"File deletion error: {str(e)}")
        # Return generic error to client
        raise HTTPException(
            status_code=500, detail="Failed to delete file. Please try again."
        )


@router.get("/api/resume/current")
async def get_current_files():
    """
    Get information about currently uploaded files (Public endpoint)
    """
    resume_exists = RESUME_PATH.exists()
    cv_exists = CV_PATH.exists()

    return {
        "resume": "resume.pdf" if resume_exists else None,
        "cv": "cv.pdf" if cv_exists else None,
    }
