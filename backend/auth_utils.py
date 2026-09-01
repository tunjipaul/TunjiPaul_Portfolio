"""
JWT Authentication Utilities

This module provides JWT token generation and verification for securing API endpoints.
Tokens are signed using HS256 algorithm and include user email and expiration time.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

security = HTTPBearer()


def create_access_token(email: str, expires_delta: Optional[timedelta] = None) -> str:
    """
    Generate a JWT access token for authenticated users.

    Args:
        email: User's email address to encode in token
        expires_delta: Optional custom expiration time (default: 24 hours)

    Returns:
        Encoded JWT token string
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)

    to_encode = {"sub": email, "exp": expire, "iat": datetime.now(timezone.utc)}

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    """
    Verify and decode a JWT token.

    Args:
        token: JWT token string to verify

    Returns:
        Decoded token payload containing user email and expiration

    Raises:
        HTTPException: If token is invalid, expired, or malformed
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    FastAPI dependency to extract and validate current user from JWT token.

    This function is used as a dependency in protected routes to ensure
    the request includes a valid JWT token in the Authorization header.

    Args:
        credentials: HTTP Bearer credentials from request header

    Returns:
        User's email address from validated token

    Raises:
        HTTPException: If token is missing, invalid, or expired

    Usage:
        @router.post("/protected-endpoint")
        def protected_route(current_user: str = Depends(get_current_user)):
            # current_user contains the authenticated user's email
            return {"message": f"Hello {current_user}"}
    """
    token = credentials.credentials
    payload = verify_token(token)
    return payload.get("sub")
