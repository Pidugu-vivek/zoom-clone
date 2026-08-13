"""Seed the database with sample meetings (and a few participants).

Run with:
    python -m app.db.seed
"""

from datetime import datetime, timedelta, timezone

from app.db.session import SessionLocal
from app.models.meeting import Meeting
from app.models.participant import Participant

NOW = datetime.now(timezone.utc)

SAMPLE_MEETINGS = [
    {
        "meeting_id": "instant-a1b2c3",
        "title": "Quick Sync",
        "description": "Ad-hoc instant meeting",
        "start_time": NOW,
        "duration": 15,
        "invite_link": "https://zoom-clone.local/join/instant-a1b2c3",
        "is_instant": True,
        "participants": ["Asha Patel", "Liam Chen"],
    },
    {
        "meeting_id": "instant-d4e5f6",
        "title": "Incident War Room",
        "description": "Urgent production issue triage",
        "start_time": NOW,
        "duration": 30,
        "invite_link": "https://zoom-clone.local/join/instant-d4e5f6",
        "is_instant": True,
        "participants": ["Maria Gomez"],
    },
    {
        "meeting_id": "sched-weekly-eng",
        "title": "Weekly Engineering Standup",
        "description": "Recurring team standup",
        "start_time": NOW + timedelta(days=1, hours=1),
        "duration": 30,
        "invite_link": "https://zoom-clone.local/join/sched-weekly-eng",
        "is_instant": False,
        "participants": ["Noah Kim", "Priya Singh", "Omar Haddad"],
    },
    {
        "meeting_id": "sched-product-review",
        "title": "Product Review",
        "description": "Quarterly roadmap walkthrough",
        "start_time": NOW + timedelta(days=2, hours=3),
        "duration": 60,
        "invite_link": "https://zoom-clone.local/join/sched-product-review",
        "is_instant": False,
        "participants": [],
    },
    {
        "meeting_id": "sched-design-crit",
        "title": "Design Critique",
        "description": "Feedback session for the new UI",
        "start_time": NOW + timedelta(days=3, hours=5),
        "duration": 45,
        "invite_link": "https://zoom-clone.local/join/sched-design-crit",
        "is_instant": False,
        "participants": ["Elena Rossi"],
    },
    {
        "meeting_id": "sched-1on1-manager",
        "title": "1:1 with Manager",
        "description": None,
        "start_time": NOW + timedelta(days=1, hours=6),
        "duration": 30,
        "invite_link": "https://zoom-clone.local/join/sched-1on1-manager",
        "is_instant": False,
        "participants": [],
    },
    {
        "meeting_id": "instant-g7h8i9",
        "title": "Screen Share Help",
        "description": "Instant call to debug a deploy issue",
        "start_time": NOW,
        "duration": 20,
        "invite_link": "https://zoom-clone.local/join/instant-g7h8i9",
        "is_instant": True,
        "participants": ["Sofia Alvarez", "Ben Turner"],
    },
    {
        "meeting_id": "sched-all-hands",
        "title": "Company All Hands",
        "description": "Monthly company-wide update",
        "start_time": NOW + timedelta(days=7),
        "duration": 60,
        "invite_link": "https://zoom-clone.local/join/sched-all-hands",
        "is_instant": False,
        "participants": ["Grace Lee"],
    },
]


def seed() -> None:
    db = SessionLocal()
    try:
        if db.query(Meeting).count() > 0:
            print("Database already seeded, skipping.")
            return

        for entry in SAMPLE_MEETINGS:
            participant_names = entry["participants"]
            meeting = Meeting(
                meeting_id=entry["meeting_id"],
                title=entry["title"],
                description=entry["description"],
                start_time=entry["start_time"],
                duration=entry["duration"],
                invite_link=entry["invite_link"],
                is_instant=entry["is_instant"],
            )
            meeting.participants = [
                Participant(display_name=name) for name in participant_names
            ]
            db.add(meeting)

        db.commit()
        print(f"Seeded {len(SAMPLE_MEETINGS)} meetings.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
