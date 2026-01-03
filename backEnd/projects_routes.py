from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db, Project

router = APIRouter(prefix="/api/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, example="Contact Manager App")
    desc: str = Field(..., min_length=1, example="Fullstack app using FastAPI, MySQL, React")
    github: str = Field(default=None, example="https://github.com/yourrepo/contact-manager")
    demo: str = Field(default=None, example="https://contact-manager-demo.com")

class ProjectUpdate(BaseModel):
    title: str = Field(None, example="Contact Manager App")
    desc: str = Field(None, example="Fullstack app using FastAPI, MySQL, React")
    github: str = Field(None, example="https://github.com/yourrepo/contact-manager")
    demo: str = Field(None, example="https://contact-manager-demo.com")

class ProjectResponse(BaseModel):
    id: int
    title: str
    desc: str
    github: str = None
    demo: str = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Routes

@router.get("", response_model=list[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    """Get all projects for the public Projects page"""
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return projects

@router.get("/manage", response_model=list[ProjectResponse])
def get_projects_for_manage(db: Session = Depends(get_db)):
    """Get all projects for the ManageProjects admin page"""
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a specific project by ID"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project"""
    db_project = Project(
        title=project.title,
        desc=project.desc,
        github=project.github,
        demo=project.demo
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    """Update an existing project"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.title is not None:
        db_project.title = project.title
    if project.desc is not None:
        db_project.desc = project.desc
    if project.github is not None:
        db_project.github = project.github
    if project.demo is not None:
        db_project.demo = project.demo
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete a project"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()