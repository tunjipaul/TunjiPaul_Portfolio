from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import bcrypt
import uvicorn
from database import get_db

app = FastAPI(title="My Personal Portfolio Backend", version="1.0.0")

origins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"]

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


@app.get("/")
def home():
    return {"message": "Welcome to My Personal Portfolio Backend!"}


@app.post("/login")
def login(user: UserLogin, db=Depends(get_db)):
    query = text("SELECT * FROM users WHERE email = :email")
    result = db.execute(query, {"email": user.email}).fetchone()

    if result:
        stored_hashed_password = result.password
        if bcrypt.checkpw(
            user.password.encode("utf-8"), stored_hashed_password.encode("utf-8")
        ):
            return {
                "message": "Login successful",
                "username": result.username,
                "email": result.email,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        raise HTTPException(status_code=404, detail="User not found")


if __name__ == "__main__":
    uvicorn.run(app, port=8000)
