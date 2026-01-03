"""
Database Migration Script - Convert education column to JSON
Run this file to migrate the 'education' column from VARCHAR to JSON
"""

from sqlalchemy import create_engine, text, inspect
import os
from dotenv import load_dotenv

load_dotenv()

def get_database_url():
    """Get database URL from environment"""
    db_url = os.getenv("DATABASE_URL")
    
    if not db_url:
        db_user = os.getenv("DB_USER", "postgres")
        db_password = os.getenv("DB_PASSWORD", "")
        db_host = os.getenv("DB_HOST", "localhost")
        db_port = os.getenv("DB_PORT", "5432")
        db_name = os.getenv("DB_NAME", "portfolio_db")
        db_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    
    return db_url

def check_column_type(engine):
    """Check current data type of education column"""
    print("\n=== Checking current column type ===")
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns 
            WHERE table_name = 'about' AND column_name = 'education';
        """))
        
        row = result.fetchone()
        if row:
            print(f"Column: {row[0]}")
            print(f"Current Type: {row[1]}")
            if row[2]:
                print(f"Max Length: {row[2]}")
            return row[1]
        else:
            print("Education column not found!")
            return None

def migrate_education_column(engine):
    """Migrate education column from VARCHAR to JSON"""
    print("\n=== Starting Migration ===")
    
    try:
        with engine.begin() as conn:
            # Check if there's existing data
            result = conn.execute(text("SELECT id, education FROM about"))
            existing_data = result.fetchall()
            
            if existing_data:
                print(f"Found {len(existing_data)} existing records")
                for row in existing_data:
                    print(f"  ID: {row[0]}, Education: {row[1]}")
            
            # Perform the migration
            print("\nConverting education column to JSON...")
            conn.execute(text("""
                ALTER TABLE about 
                ALTER COLUMN education TYPE JSON 
                USING '[]'::json;
            """))
            
            print("✓ Migration successful!")
            
    except Exception as e:
        print(f"✗ Migration failed: {e}")
        raise

def verify_migration(engine):
    """Verify the migration was successful"""
    print("\n=== Verifying Migration ===")
    
    column_type = check_column_type(engine)
    
    if column_type in ['json', 'jsonb']:
        print("✓ Column type successfully changed to JSON")
        
        # Test inserting JSON data
        try:
            with engine.begin() as conn:
                test_data = [
                    {
                        "institution": "Test University",
                        "degree": "Test Degree",
                        "field": "Test Field",
                        "startYear": "2020",
                        "endYear": "2024"
                    }
                ]
                
                conn.execute(text("""
                    INSERT INTO about (title, content, image_url, education)
                    VALUES (:title, :content, :image_url, :education::json)
                """), {
                    "title": "TEST",
                    "content": "TEST CONTENT",
                    "image_url": "http://test.com",
                    "education": str(test_data).replace("'", '"')
                })
                
                # Delete the test record
                conn.execute(text("DELETE FROM about WHERE title = 'TEST'"))
                
                print("✓ JSON insert test passed")
        except Exception as e:
            print(f"✗ JSON insert test failed: {e}")
    else:
        print(f"✗ Column type is still {column_type}")

def main():
    """Main migration function"""
    print("=" * 60)
    print("EDUCATION COLUMN MIGRATION SCRIPT")
    print("=" * 60)
    
    try:
        # Get database URL
        db_url = get_database_url()
        print(f"\nConnecting to database...")
        print(f"Database: {db_url.split('@')[1] if '@' in db_url else 'local'}")
        
        # Create engine
        engine = create_engine(db_url)
        
        # Check current state
        current_type = check_column_type(engine)
        
        if current_type in ['json', 'jsonb']:
            print("\n✓ Column is already JSON type. No migration needed!")
            return
        
        # Ask for confirmation
        print("\n" + "=" * 60)
        print("WARNING: This will alter the 'education' column")
        print("Current data will be replaced with empty arrays")
        print("=" * 60)
        response = input("\nProceed with migration? (yes/no): ")
        
        if response.lower() != 'yes':
            print("Migration cancelled.")
            return
        
        # Run migration
        migrate_education_column(engine)
        
        # Verify
        verify_migration(engine)
        
        print("\n" + "=" * 60)
        print("MIGRATION COMPLETE!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Restart your FastAPI backend")
        print("2. Test creating/updating about section in your admin panel")
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\nIf you see connection errors, check your .env file")
        
if __name__ == "__main__":
    main()