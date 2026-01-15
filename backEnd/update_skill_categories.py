from sqlalchemy import create_engine, text
from dotenv import load_dotenv
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

print("Updating skill categories...")

with engine.begin() as conn:
    # Update the old category name to the new one
    update_query = text("""
        UPDATE skills 
        SET category = 'Tools, Version Control & AI' 
        WHERE category = 'Tools & Version Control'
    """)
    
    result = conn.execute(update_query)
    print(f"✅ Updated {result.rowcount} skill(s) from 'Tools & Version Control' to 'Tools, Version Control & AI'")

print("Done! Refresh your browser to see the changes.")
