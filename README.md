# temple-portfolio

Personal portfolio and contact hub for Temple Shelemiah Lomotey — full-stack designer & developer. A living showcase of selected work, an intro to process and services, and a direct channel for client inquiries.

**Live:** https://temple-portfolio-dun.vercel.app

## Features

- **Home** — hero, trusted-by strip, featured work, services, about, testimonials, CTA banner, contact modal
- **Projects** — filterable project index plus per-project detail pages, all served from the API
- **Blog** — post index and detail pages with sanitized HTML rendering
- **Contact** — validated contact form (react-hook-form) posting to the backend, which delivers via email
- **Admin** — Django admin (Unfold theme) to manage projects, blog posts, testimonials, and inquiries; JWT-protected write paths
- **SEO** — dynamic `sitemap.xml` (static + projects + blog), per-page meta via react-helmet-async
- **API docs** — OpenAPI schema + Swagger UI served by the backend

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, TypeScript, React Router 7, Tailwind CSS 4 |
| Frontend state | TanStack Query (server state), Zustand (UI state) |
| Frontend motion/forms | Framer Motion, react-hook-form, react-hot-toast |
| Backend | Python 3.13, Django 6, Django REST Framework |
| Auth | JWT via `djangorestframework-simplejwt` (admin only) |
| Database | PostgreSQL 16 (SQLite for quick local runs) |
| Media | Cloudinary (Pillow for image handling) |
| Email | django-anymail (Resend) |
| Cache / queues | Redis + Celery |
| API docs | drf-spectacular (schema + Swagger UI) |
| Lint / types | Oxlint + `tsc -b` (frontend), Ruff + Black (backend) |
| Tests | pytest + pytest-django + factory-boy (backend) |

## Layout

```
temple-portfolio/
├── frontend/                 # Vite + React SPA
│   └── src/
│       ├── pages/            # Home, Projects, ProjectDetail, Blog, BlogDetail, NotFound
│       ├── components/
│       │   ├── sections/     # Hero, FeaturedWork, Services, Testimonials, ...
│       │   ├── layout/       # Site chrome (header, footer)
│       │   └── common/       # Shared UI
│       ├── api/              # Axios client + projects/blog/contact/testimonials modules
│       ├── store/            # Zustand stores
│       └── hooks/ utils/ types/ styles/
├── backend/                  # Django 6 + DRF API (see backend/README.md)
│   ├── apps/
│   │   ├── projects/         # Portfolio projects
│   │   ├── blog/             # Blog posts
│   │   ├── testimonials/     # Testimonials
│   │   ├── contact/          # Inquiries + email delivery
│   │   └── core/             # Health check, sitemaps
│   └── config/               # Settings, URLs, Celery
└── temple-portfolio-spec.md  # Full technical specification
```

## API

Base path `/api/v1/` (local backend defaults to `http://localhost:8000`, override with `VITE_API_URL`):

| Endpoint | Description |
|---|---|
| `GET /projects/` | Project list (`?featured=true` for featured only) |
| `GET /blog/` | Blog posts |
| `GET /testimonials/` | Testimonials |
| `POST /contact/` | Contact form submission |
| `POST /auth/token/` (+ `/refresh/`) | Admin JWT |
| `GET /health/` | Health check |
| `GET /schema/` + `/docs/` | OpenAPI schema + Swagger UI |
| `GET /sitemap.xml` | Dynamic sitemap |
| `/admin/` | Django admin (Unfold) |

## Run it

Backend (full setup in `backend/README.md`):

```bash
cd backend
uv sync
uv run python manage.py migrate
uv run python seed.py            # sample data
uv run python manage.py runserver 8001
```

Frontend:

```bash
cd frontend
pnpm install
pnpm run dev                     # Vite dev server
```

Environment:

- Backend copies `.env.example` to `.env` (database, Redis, email, Cloudinary, JWT).
- Frontend: set `VITE_API_URL` to the backend origin (defaults to `http://localhost:8000/api/v1`).

Checks:

```bash
cd frontend && pnpm run lint && pnpm run build   # Oxlint + tsc + Vite build
cd backend && uv run pytest                      # backend test suite
```

## Deployment

- Frontend deploys from `frontend/` (see `vercel.json`); production API base is baked in via `VITE_API_URL`.
- Backend ships with a `Dockerfile`, `docker-compose.yml`, and `entrypoint.sh` (Gunicorn + Whitenoise for static files).

## License

MIT — see LICENSE.
