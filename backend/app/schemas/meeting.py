from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.participant import ParticipantRead


class MeetingBase(BaseModel):
    title: str
    description: str | None = None
    start_time: datetime
    duration: int
    is_instant: bool = False


class MeetingCreate(MeetingBase):
    meeting_id: str
    invite_link: str
    created_by_id: int | None = None


class MeetingUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    start_time: datetime | None = None
    duration: int | None = None
    is_instant: bool | None = None


class MeetingRead(MeetingBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    meeting_id: str
    invite_link: str
    created_at: datetime
    created_by_id: int | None = None
    participants: list[ParticipantRead] = Field(default_factory=list)


class MeetingInstantCreateRequest(BaseModel):
    """Request body for POST /meetings/instant. meeting_id and invite_link are server-generated."""

    title: str = "Instant Meeting"
    description: str | None = None
    duration: int = Field(default=60, gt=0, le=1440)


class MeetingScheduleCreateRequest(BaseModel):
    """Request body for POST /meetings/schedule. meeting_id and invite_link are server-generated."""

    title: str
    description: str | None = None
    start_time: datetime
    duration: int = Field(gt=0, le=1440)


class JoinMeetingRequest(BaseModel):
    """Request body for POST /meetings/join."""

    meeting_id: str
    display_name: str = Field(min_length=1, max_length=255)


class JoinMeetingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    meeting: MeetingRead
    participant: ParticipantRead
