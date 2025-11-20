from database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("Database response:", result.fetchone())
except Exception as e:
    print("Error connecting to database:", e)
