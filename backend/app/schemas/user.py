from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserSignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserRead(BaseModel):
    """Safe, public representation of a user — never includes hashed_password."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    created_at: datetime


class AuthResponse(BaseModel):
    user: UserRead
    access_token: str
    token_type: str = "bearer"
