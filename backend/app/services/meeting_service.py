import secrets
import string
from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.crud import meeting as meeting_crud
from app.crud import participant as participant_crud
from app.models.meeting import Meeting
from app.models.participant import Participant
from app.schemas.meeting import (
    JoinMeetingRequest,
    MeetingCreate,
    MeetingInstantCreateRequest,
    MeetingScheduleCreateRequest,
)
from app.schemas.participant import ParticipantCreate

_CODE_ALPHABET = string.ascii_lowercase + string.digits
_CODE_SEGMENT_LENGTH = 3
_CODE_SEGMENTS = 3
_MAX_GENERATION_ATTEMPTS = 10


def _generate_code() -> str:
    segments = (
        "".join(secrets.choice(_CODE_ALPHABET) for _ in range(_CODE_SEGMENT_LENGTH))
        for _ in range(_CODE_SEGMENTS)
    )
    return "-".join(segments)


def _generate_unique_meeting_id(db: Session) -> str:
    for _ in range(_MAX_GENERATION_ATTEMPTS):
        candidate = _generate_code()
        if meeting_crud.get_meeting_by_meeting_id(db, candidate) is None:
            return candidate
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Could not generate a unique meeting ID, please try again",
    )


def _build_invite_link(meeting_id: str) -> str:
    return f"{settings.FRONTEND_BASE_URL.rstrip('/')}/join/{meeting_id}"


def _create_meeting_or_conflict(db: Session, meeting_in: MeetingCreate) -> Meeting:
    try:
        return meeting_crud.create_meeting(db, meeting_in)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A meeting with a conflicting unique field already exists",
        ) from exc


def list_meetings(db: Session, skip: int = 0, limit: int = 100) -> list[Meeting]:
    return meeting_crud.get_meetings(db, skip=skip, limit=limit)


def get_meeting_by_public_id(db: Session, meeting_id: str) -> Meeting:
    meeting = meeting_crud.get_meeting_by_meeting_id(db, meeting_id)
    if meeting is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Meeting '{meeting_id}' not found",
        )
    return meeting


def create_instant_meeting(
    db: Session, payload: MeetingInstantCreateRequest, created_by_id: int
) -> Meeting:
    meeting_id = _generate_unique_meeting_id(db)
    meeting_in = MeetingCreate(
        meeting_id=meeting_id,
        title=payload.title,
        description=payload.description,
        start_time=datetime.now(timezone.utc),
        duration=payload.duration,
        invite_link=_build_invite_link(meeting_id),
        is_instant=True,
        created_by_id=created_by_id,
    )
    return _create_meeting_or_conflict(db, meeting_in)


def create_scheduled_meeting(
    db: Session, payload: MeetingScheduleCreateRequest, created_by_id: int
) -> Meeting:
    start_time = payload.start_time
    if start_time.tzinfo is None:
        start_time = start_time.replace(tzinfo=timezone.utc)

    if start_time < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="start_time must be in the future for a scheduled meeting",
        )

    meeting_id = _generate_unique_meeting_id(db)
    meeting_in = MeetingCreate(
        meeting_id=meeting_id,
        title=payload.title,
        description=payload.description,
        start_time=start_time,
        duration=payload.duration,
        invite_link=_build_invite_link(meeting_id),
        is_instant=False,
        created_by_id=created_by_id,
    )
    return _create_meeting_or_conflict(db, meeting_in)


def join_meeting(db: Session, payload: JoinMeetingRequest) -> tuple[Meeting, Participant]:
    meeting = get_meeting_by_public_id(db, payload.meeting_id)
    participant_in = ParticipantCreate(meeting_id=meeting.id, display_name=payload.display_name)
    participant = participant_crud.create_participant(db, participant_in)
    return meeting, participant
