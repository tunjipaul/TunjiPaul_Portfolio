from sqlalchemy import (
    create_engine,
    text,
    Column,
    Integer,
    String,
    Text,
    JSON,
    DateTime,
    Boolean,
)
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from datetime import datetime, timezone
import os


load_dotenv()


db_url = os.getenv("DATABASE_URL")


if not db_url:
    db_user = os.getenv("DB_USER", "postgres")
    db_password = os.getenv("DB_PASSWORD", "")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME", "portfolio_db")
    db_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

engine = create_engine(db_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Hero(Base):
    __tablename__ = "hero"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subtitle = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=True)
    view_button_text = Column(String(255), nullable=True)
    contact_button_text = Column(String(255), nullable=True)


class About(Base):
    __tablename__ = "about"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    content = Column(Text)
    image_url = Column(String(255))
    skills = Column(JSON)
    education = Column(String(255))


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    desc = Column(String(1000), nullable=False)
    github = Column(String(500), nullable=True)
    demo = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    category = Column(String(255), nullable=False)
    icon = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    with engine.begin() as db:

        create_user_query = text(
            """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
        """
        )
        db.execute(create_user_query)

        insert_admin_query = text(
            """
        INSERT INTO users (email, password)
        VALUES (:email, :password)
        ON CONFLICT (email) DO NOTHING;
        """
        )

        admin_email = os.getenv("ADMIN_LOGIN_EMAIL", "admin@example.com")
        admin_password = os.getenv("ADMIN_LOGIN_PASSWORD", "password123")

        db.execute(
            insert_admin_query, {"email": admin_email, "password": admin_password}
        )

        create_hero_query = text(
            """
        CREATE TABLE IF NOT EXISTS hero (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            subtitle TEXT NOT NULL,
            image_url VARCHAR(500),
            view_button_text VARCHAR(255),
            contact_button_text VARCHAR(255)
        );
        """
        )
        db.execute(create_hero_query)

        create_about_query = text(
            """
        CREATE TABLE IF NOT EXISTS about (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            content TEXT,
            image_url VARCHAR(500),
            skills JSON,
            education VARCHAR(500)
        );
        """
        )
        db.execute(create_about_query)

        create_projects_query = text(
            """
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            "desc" VARCHAR(1000) NOT NULL,
            github VARCHAR(500),
            demo VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        )
        db.execute(create_projects_query)

        create_skills_query = text(
            """
        CREATE TABLE IF NOT EXISTS skills (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            category VARCHAR(255) NOT NULL,
            icon VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        )
        db.execute(create_skills_query)

        create_messages_query = text(
            """
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        )
        db.execute(create_messages_query)

        db.commit()

        print("Users table ensured and admin inserted.")
        print("Projects table created/verified successfully")


if __name__ == "__main__":
    print("Creating tables...")
    create_tables()
