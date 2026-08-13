from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Zoom Clone API"
    API_V1_PREFIX: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./app.db"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    FRONTEND_BASE_URL: str = "http://localhost:3000"

    JWT_SECRET_KEY: str = "change-this-to-a-secure-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
