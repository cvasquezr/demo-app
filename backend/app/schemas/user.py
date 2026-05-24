from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from ..models.user import Role


class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str
    role: Role = Role.user


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None


class UserResponse(UserBase):
    id: int
    role: Role
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
