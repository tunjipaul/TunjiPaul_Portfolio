from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import os
import shutil
from pathlib import Path

router = APIRouter()


UPLOAD_DIR = Path("uploads/documents")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


RESUME_PATH = UPLOAD_DIR / "resume.pdf"
CV_PATH = UPLOAD_DIR / "cv.pdf"


@router.post("/api/resume/upload")
async def upload_document(file: UploadFile = File(...), type: str = Form(...)):
    """
    Upload resume or CV
    """

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    if type not in ["resume", "cv"]:
        raise HTTPException(status_code=400, detail="Type must be 'resume' or 'cv'")

    file_path = RESUME_PATH if type == "resume" else CV_PATH

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "message": f"{type.upper()} uploaded successfully",
            "filename": file.filename,
            "type": type,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")


@router.get("/api/resume/download/{type}")
async def download_document(type: str):
    """
    Download resume or CV
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
async def delete_document(type: str):
    """
    Delete resume or CV
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
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")


@router.get("/api/resume/current")
async def get_current_files():
    """
    Get information about currently uploaded files
    """
    resume_exists = RESUME_PATH.exists()
    cv_exists = CV_PATH.exists()

    return {
        "resume": "resume.pdf" if resume_exists else None,
        "cv": "cv.pdf" if cv_exists else None,
    }
