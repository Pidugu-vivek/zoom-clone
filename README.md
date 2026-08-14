# Zoom Clone

A full-stack video conferencing platform inspired by Zoom, built with Next.js, FastAPI, and SQLite. The application supports user authentication, instant meetings, scheduled meetings, joining meetings, meeting ownership, local camera and microphone controls, participants, and in-meeting chat.

## Features

### Authentication
- User sign up
- User sign in
- JWT-based authentication
- Persistent user sessions
- Logout
- Authenticated user profile menu

### Meetings
- Create instant meetings
- Generate unique meeting IDs
- Generate shareable invite links
- Join meetings using a meeting ID or invite link
- Display name support when joining
- Validate meeting existence
- Schedule meetings with title, description, date/time, and duration
- View upcoming and recent meetings
- Associate newly created meetings with the authenticated user who created them

### Meeting Room
- Local camera preview
- Camera enable/disable controls
- Microphone enable/disable controls
- Real microphone activity indicator
- Meeting timer
- Copy invite link
- Participants panel
- Local in-meeting chat
- Leave meeting
- Responsive meeting room interface

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- shadcn/ui
- Lucide React

### Backend
- FastAPI
- Python
- SQLAlchemy
- Alembic
- Pydantic
- JWT authentication
- bcrypt password hashing

### Database
- SQLite

## Database Design

The application uses three primary entities:

### Users
Stores authenticated user information.

- `id`
- `name`
- `email`
- `hashed_password`
- `created_at`

### Meetings
Stores instant and scheduled meetings.

- `id`
- `meeting_id`
- `title`
- `description`
- `start_time`
- `duration`
- `invite_link`
- `created_at`
- `is_instant`
- `created_by_id`

`created_by_id` links a meeting to the user who created it. Existing seeded meetings can have a `NULL` creator.

### Participants
Stores participants associated with meetings.

A meeting can have multiple participants.

## Project Structure

```text
Zoom-clone/
├── backend/
│   ├── alembic/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── requirements.txt
│   └── alembic.ini
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── store/
│   │   └── types/
│   └── package.json
│
└── README.md

