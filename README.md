# temple-portfolio

Personal portfolio site — software engineering profile, project showcase, and contact form.

**Stack:** Vite + React + TypeScript frontend; Django 5 + DRF backend (port 8001); deployed frontend on Vercel.
**Live:** https://temple-portfolio-dun.vercel.app

## Layout

- `frontend/` — Vite + React SPA
- `backend/` — Django 5 + DRF API (`/api/v1/projects/`, contact endpoint; see `backend/README.md`)

## Run it

```bash
# backend (see backend/README.md for full setup)
cd backend && uv sync && uv run python manage.py migrate && uv run python manage.py runserver 8001
# frontend
cd frontend && pnpm install && pnpm run dev
```

## License

MIT.
