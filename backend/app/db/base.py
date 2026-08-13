from app.db.base_class import Base  # noqa

# Import all models here so Alembic can discover them for autogeneration.
from app.models.meeting import Meeting  # noqa: E402,F401
from app.models.participant import Participant  # noqa: E402,F401
from app.models.user import User  # noqa: E402,F401
