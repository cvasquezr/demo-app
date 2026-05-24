from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .models import user, item  # noqa: F401 — ensures models are registered before create_all
from .routers import auth, items, users
from .core.security import get_password_hash
from .database import SessionLocal
from .models.user import User, Role

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Demo App API", version="1.0.0", docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(items.router)
app.include_router(users.router)


@app.on_event("startup")
def seed_admin():
    """Crea un admin por defecto si no existe ningún usuario."""
    db = SessionLocal()
    try:
        if not db.query(User).first():
            admin = User(
                email="admin@demo.com",
                full_name="Administrador",
                hashed_password=get_password_hash("admin123"),
                role=Role.admin,
            )
            db.add(admin)
            db.commit()
    finally:
        db.close()


@app.get("/api/health")
def health():
    return {"status": "ok"}
