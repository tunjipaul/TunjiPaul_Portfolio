from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from database import get_db, About

router = APIRouter(prefix="/api/about", tags=["About"])


class AboutBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    skills: Optional[List[str]] = []
    education: Optional[str] = None


class AboutCreate(AboutBase):
    pass


class AboutUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    skills: Optional[List[str]] = None
    education: Optional[str] = None


class AboutResponse(AboutBase):
    id: int

    class Config:
        from_attributes = True


@router.get("", response_model=List[AboutResponse])
def get_all_about(db: Session = Depends(get_db)):
    return db.query(About).all()


@router.get("/{about_id}", response_model=AboutResponse)
def get_about(about_id: int, db: Session = Depends(get_db)):
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=404, detail="About section not found")
    return about


@router.post("", response_model=AboutResponse, status_code=201)
def create_about(about: AboutCreate, db: Session = Depends(get_db)):
    new_about = About(
        title=about.title,
        content=about.content,
        image_url=about.image_url,
        skills=about.skills,
        education=about.education,
    )
    db.add(new_about)
    db.commit()
    db.refresh(new_about)
    return new_about


@router.put("/{about_id}", response_model=AboutResponse)
def update_about(about_id: int, about: AboutUpdate, db: Session = Depends(get_db)):
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About section not found")

    update_data = about.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_about, key, value)

    db.commit()
    db.refresh(db_about)
    return db_about


@router.delete("/{about_id}", status_code=204)
def delete_about(about_id: int, db: Session = Depends(get_db)):
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About section not found")

    db.delete(db_about)
    db.commit()
    return None
