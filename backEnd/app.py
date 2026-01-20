from fastapi import FastAPI, HTTPException, Depends
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
import uvicorn
import bcrypt
from database import get_db, Base, engine, create_tables
from hero_routes import router as hero_router
from about_routes import router as about_router
from projects_routes import router as project_router
from messages_routes import router as message_router
from skills_routes import router as skills_router
from resume_routes import router as resume_router


try:
    create_tables() 
    print("Tables created/verified successfully")
except Exception as e:
    print(f"Warning: Could not create tables: {e}")
    print("Make sure PostgreSQL is running")

app = FastAPI(title="My Personal Portfolio Backend", version="1.0.0")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "https://tunji-paul-portfolio.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserLogin(BaseModel):
    email: str = Field(..., example="sam@gmail.com")
    password: str = Field(..., example="yourpassword")


app.include_router(hero_router)
app.include_router(about_router)
app.include_router(project_router)
app.include_router(message_router)
app.include_router(skills_router)
app.include_router(resume_router)



@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )


@app.get("/")
def home():
    return {"message": "Welcome to My Personal Portfolio Backend!"}


@app.post("/login")
def login(user: UserLogin, db=Depends(get_db)):
    query = text("SELECT * FROM users WHERE email = :email")
    result = db.execute(query, {"email": user.email}).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if password is already hashed (bcrypt hashes start with $2b$)
    if result.password.startswith('$2b$'):
        # Password is hashed - verify using bcrypt
        if bcrypt.checkpw(user.password.encode('utf-8'), result.password.encode('utf-8')):
            return {
                "message": "Login successful",
                "email": result.email,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        # Password is plain text - migrate it on successful login
        if user.password == result.password:
            # Login successful - now hash and update the password
            hashed_password = bcrypt.hashpw(
                user.password.encode('utf-8'), 
                bcrypt.gensalt()
            ).decode('utf-8')
            
            update_query = text("UPDATE users SET password = :password WHERE email = :email")
            db.execute(update_query, {"password": hashed_password, "email": user.email})
            db.commit()
            
            print(f"✅ Password migrated to bcrypt hash for {user.email}")
            return {
                "message": "Login successful",
                "email": result.email,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid password")


if __name__ == "__main__":
    uvicorn.run(app, port=8000)