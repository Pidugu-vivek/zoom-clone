from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ParticipantBase(BaseModel):
    display_name: str


class ParticipantCreate(ParticipantBase):
    meeting_id: int


class ParticipantUpdate(BaseModel):
    display_name: str | None = None


class ParticipantRead(ParticipantBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    meeting_id: int
    joined_at: datetime
