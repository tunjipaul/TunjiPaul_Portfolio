from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from database import get_db, Skill
from datetime import datetime

router = APIRouter(prefix="/api/skills", tags=["Skills"])


class SkillBase(BaseModel):
    name: str
    category: str
    icon: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    icon: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    created_at: datetime
    

    class Config:
        from_attributes = True


@router.get("", response_model=List[SkillResponse])
def get_all_skills(db: Session = Depends(get_db)):
    """Get all skills"""
    skills = db.query(Skill).all()
    return skills


@router.get("/{skill_id}", response_model=SkillResponse)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a specific skill by ID"""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post("", response_model=SkillResponse, status_code=201)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    """Create a new skill"""
    # Check if skill with same name already exists
    existing_skill = db.query(Skill).filter(Skill.name == skill.name).first()
    if existing_skill:
        raise HTTPException(status_code=400, detail="Skill with this name already exists")
    
    new_skill = Skill(name=skill.name, category=skill.category)
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill


@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(skill_id: int, skill: SkillUpdate, db: Session = Depends(get_db)):
    """Update a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    
    if skill.name and skill.name != db_skill.name:
        existing_skill = db.query(Skill).filter(Skill.name == skill.name).first()
        if existing_skill:
            raise HTTPException(status_code=400, detail="Skill with this name already exists")

    update_data = skill.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_skill, key, value)

    db.commit()
    db.refresh(db_skill)
    return db_skill


@router.delete("/{skill_id}", status_code=204)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    """Delete a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    db.delete(db_skill)
    db.commit()
    return None
