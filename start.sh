#!/bin/bash
# Startup script for Render deployment
# This script runs database migrations before starting the server

echo "Running database migrations..."
cd backEnd
alembic upgrade head
cd ..

echo "Starting FastAPI server..."
cd backEnd
uvicorn main:app --host 0.0.0.0 --port 10000
