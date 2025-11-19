from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from database import get_db, Hero 

router = APIRouter(prefix="/api/hero", tags=["Hero"])


class HeroBase(BaseModel):
    title: str
    subtitle: str
    image_url: Optional[str] = None

class HeroCreate(HeroBase):
    pass

class HeroUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image_url: Optional[str] = None

class HeroResponse(HeroBase):
    id: int

    class Config:
        from_attributes = True

# Endpoints
@router.get("/", response_model=List[HeroResponse])
def get_all_heroes(db: Session = Depends(get_db)):
    heroes = db.query(Hero).all()
    return heroes

@router.get("/{hero_id}", response_model=HeroResponse)
def get_hero(hero_id: int, db: Session = Depends(get_db)):
    hero = db.query(Hero).filter(Hero.id == hero_id).first()
    if not hero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Hero with id {hero_id} not found")
    return hero

@router.post("/", response_model=HeroResponse, status_code=status.HTTP_201_CREATED)
def create_hero(hero: HeroCreate, db: Session = Depends(get_db)):
    new_hero = Hero(title=hero.title, subtitle=hero.subtitle, image_url=hero.image_url)
    db.add(new_hero)
    db.commit()
    db.refresh(new_hero)
    return new_hero

@router.put("/{hero_id}", response_model=HeroResponse)
def update_hero(hero_id: int, hero: HeroUpdate, db: Session = Depends(get_db)):
    db_hero = db.query(Hero).filter(Hero.id == hero_id).first()
    if not db_hero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Hero with id {hero_id} not found")
    update_data = hero.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_hero, key, value)
    db.commit()
    db.refresh(db_hero)
    return db_hero

@router.delete("/{hero_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hero(hero_id: int, db: Session = Depends(get_db)):
    db_hero = db.query(Hero).filter(Hero.id == hero_id).first()
    if not db_hero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Hero with id {hero_id} not found")
    db.delete(db_hero)
    db.commit()
    return None
