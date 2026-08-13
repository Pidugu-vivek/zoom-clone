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
    participants: list[ParticipantRead] = Field(default_factory=list)
