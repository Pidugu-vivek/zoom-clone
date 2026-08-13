from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate, MeetingUpdate


def get_meeting(db: Session, meeting_pk: int) -> Meeting | None:
    return db.get(Meeting, meeting_pk)


def get_meeting_by_meeting_id(db: Session, meeting_id: str) -> Meeting | None:
    return db.execute(select(Meeting).where(Meeting.meeting_id == meeting_id)).scalar_one_or_none()


def get_meeting_by_invite_link(db: Session, invite_link: str) -> Meeting | None:
    return db.execute(select(Meeting).where(Meeting.invite_link == invite_link)).scalar_one_or_none()


def get_meetings(db: Session, skip: int = 0, limit: int = 100) -> list[Meeting]:
    return list(db.execute(select(Meeting).offset(skip).limit(limit)).scalars().all())


def create_meeting(db: Session, meeting_in: MeetingCreate) -> Meeting:
    db_meeting = Meeting(**meeting_in.model_dump())
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting


def update_meeting(db: Session, db_meeting: Meeting, meeting_in: MeetingUpdate) -> Meeting:
    for field, value in meeting_in.model_dump(exclude_unset=True).items():
        setattr(db_meeting, field, value)
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting


def delete_meeting(db: Session, db_meeting: Meeting) -> None:
    db.delete(db_meeting)
    db.commit()
