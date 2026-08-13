from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.crud import user as user_crud
from app.schemas.user import AuthResponse, UserLoginRequest, UserRead, UserSignupRequest

_DUPLICATE_EMAIL_ERROR = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="An account with this email already exists",
)
_INVALID_CREDENTIALS_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect email or password",
)


def _normalize_email(email: str) -> str:
    return email.strip().lower()


def signup(db: Session, payload: UserSignupRequest) -> AuthResponse:
    email = _normalize_email(payload.email)
    if user_crud.get_user_by_email(db, email) is not None:
        raise _DUPLICATE_EMAIL_ERROR

    try:
        db_user = user_crud.create_user(
            db,
            name=payload.name.strip(),
            email=email,
            hashed_password=hash_password(payload.password),
        )
    except IntegrityError as exc:
        db.rollback()
        raise _DUPLICATE_EMAIL_ERROR from exc

    token = create_access_token(db_user.id)
    return AuthResponse(user=UserRead.model_validate(db_user), access_token=token)


def login(db: Session, payload: UserLoginRequest) -> AuthResponse:
    email = _normalize_email(payload.email)
    db_user = user_crud.get_user_by_email(db, email)
    if db_user is None or not verify_password(payload.password, db_user.hashed_password):
        raise _INVALID_CREDENTIALS_ERROR

    token = create_access_token(db_user.id)
    return AuthResponse(user=UserRead.model_validate(db_user), access_token=token)
