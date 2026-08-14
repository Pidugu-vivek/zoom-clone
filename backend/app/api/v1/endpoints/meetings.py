from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.meeting import (
    JoinMeetingRequest,
    JoinMeetingResponse,
    MeetingInstantCreateRequest,
    MeetingRead,
    MeetingScheduleCreateRequest,
)
from app.services import meeting_service

router = APIRouter()


@router.get("", response_model=list[MeetingRead])
def list_meetings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db),
) -> list[MeetingRead]:
    return meeting_service.list_meetings(db, skip=skip, limit=limit)


@router.get("/{meeting_id}", response_model=MeetingRead)
def get_meeting(meeting_id: str, db: Session = Depends(get_db)) -> MeetingRead:
    return meeting_service.get_meeting_by_public_id(db, meeting_id)


@router.post("/instant", response_model=MeetingRead, status_code=status.HTTP_201_CREATED)
def create_instant_meeting(
    payload: MeetingInstantCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> MeetingRead:
    return meeting_service.create_instant_meeting(db, payload, created_by_id=current_user.id)


@router.post("/schedule", response_model=MeetingRead, status_code=status.HTTP_201_CREATED)
def create_scheduled_meeting(
    payload: MeetingScheduleCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> MeetingRead:
    return meeting_service.create_scheduled_meeting(db, payload, created_by_id=current_user.id)


@router.post("/join", response_model=JoinMeetingResponse, status_code=status.HTTP_200_OK)
def join_meeting(payload: JoinMeetingRequest, db: Session = Depends(get_db)) -> JoinMeetingResponse:
    meeting, participant = meeting_service.join_meeting(db, payload)
    return JoinMeetingResponse(meeting=meeting, participant=participant)
