from fastapi import FastAPI, HTTPException, Depends
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
import uvicorn
import bcrypt
import os
from auth_utils import create_access_token, ACCESS_TOKEN_EXPIRE_HOURS
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
    print("Note: For future schema changes, use Alembic migrations:")
    print("  - Create migration: alembic revision --autogenerate -m 'description'")
    print("  - Apply migrations: alembic upgrade head")
except Exception as e:
    print(f"Warning: Could not create tables: {e}")
    print("Make sure PostgreSQL is running or run: alembic upgrade head")

app = FastAPI(title="My Personal Portfolio Backend", version="1.0.0")

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://localhost:5174,https://tunji-paul-portfolio.vercel.app",
)
origins = [origin.strip() for origin in allowed_origins.split(",")]

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


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "portfolio-backend"}


@app.post("/login")
def login(user: UserLogin, db=Depends(get_db)):
    query = text("SELECT * FROM users WHERE email = :email")
    result = db.execute(query, {"email": user.email}).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    if result.password.startswith("$2b$"):
        if bcrypt.checkpw(
            user.password.encode("utf-8"), result.password.encode("utf-8")
        ):
            access_token = create_access_token(email=result.email)
            return {
                "message": "Login successful",
                "email": result.email,
                "access_token": access_token,
                "token_type": "bearer",
                "expires_in": ACCESS_TOKEN_EXPIRE_HOURS * 3600,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        if user.password == result.password:
            hashed_password = bcrypt.hashpw(
                user.password.encode("utf-8"), bcrypt.gensalt()
            ).decode("utf-8")

            update_query = text(
                "UPDATE users SET password = :password WHERE email = :email"
            )
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
