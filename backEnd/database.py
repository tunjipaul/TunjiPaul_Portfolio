from sqlalchemy import create_engine, text, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from pymysql.constants import CLIENT
import os


load_dotenv()

db_url = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

engine = create_engine(db_url, connect_args={"client_flag": CLIENT.MULTI_STATEMENTS})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ------------------- MODELS -------------------
class Hero(Base):
    __tablename__ = "hero"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subtitle = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=True)
    view_button_text = Column(String(255), nullable=True)
    contact_button_text = Column(String(255), nullable=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    with engine.begin() as db:
        create_table_query = text(
            """
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        """
        )
        db.execute(create_table_query)

        insert_admin_query = text(
            """
        INSERT INTO users (email, password)
        VALUES ('tunjipaul007@gmail.com', 'Olatunji007.');
        """
        )


        db.execute(insert_admin_query)

          # Hero table
        create_hero_query = text(
            """
        CREATE TABLE IF NOT EXISTS hero (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            subtitle VARCHAR(255) NOT NULL,
            image_url VARCHAR(500)
            view_button_text VARCHAR(255),
            contact_button_text VARCHAR(255)
        );
        """
        )

        db.execute(create_hero_query)

        db.commit()

        print("Users table ensured and admin inserted.")


if __name__ == "__main__":
    print("Creating tables...")
    create_tables()
