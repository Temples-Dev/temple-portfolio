# Temple Portfolio — Backend

Django 5 + DRF REST API.

## Dev setup

```bash
# Install deps
uv sync

# Run migrations (first time)
uv run python manage.py migrate

# Seed sample data
uv run python seed.py

# Create superuser
uv run python manage.py createsuperuser

# Start server (port 8001 — 8000 used by another project on this machine)
uv run python manage.py runserver 8001
```

## Key URLs

| URL | Description |
|-----|-------------|
| `http://localhost:8001/api/v1/projects/` | Project list |
| `http://localhost:8001/api/v1/projects/?featured=true` | Featured only |
| `http://localhost:8001/api/v1/contact/` | Contact form POST |
| `http://localhost:8001/api/v1/testimonials/` | Testimonials |
| `http://localhost:8001/api/v1/health/` | Health check |
| `http://localhost:8001/api/v1/docs/` | Swagger UI |
| `http://localhost:8001/admin/` | Django admin (admin / admin123) |

## Frontend env

Add to `frontend/.env.local`:
```
VITE_API_URL=http://localhost:8001/api/v1
```
