from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.participant import Participant
from app.schemas.participant import ParticipantCreate, ParticipantUpdate


def get_participant(db: Session, participant_id: int) -> Participant | None:
    return db.get(Participant, participant_id)


def get_participants_by_meeting(
    db: Session, meeting_id: int, skip: int = 0, limit: int = 100
) -> list[Participant]:
    return list(
        db.execute(
            select(Participant).where(Participant.meeting_id == meeting_id).offset(skip).limit(limit)
        )
        .scalars()
        .all()
    )


def create_participant(db: Session, participant_in: ParticipantCreate) -> Participant:
    db_participant = Participant(**participant_in.model_dump())
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant


def update_participant(
    db: Session, db_participant: Participant, participant_in: ParticipantUpdate
) -> Participant:
    for field, value in participant_in.model_dump(exclude_unset=True).items():
        setattr(db_participant, field, value)
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant


def delete_participant(db: Session, db_participant: Participant) -> None:
    db.delete(db_participant)
    db.commit()
