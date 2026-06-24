# Portfolio Website — Full Technical Specification
**Temple | Full-Stack Designer & Developer**
_Django + React | Single-Page Application_

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design System](#2-design-system)
3. [Information Architecture](#3-information-architecture)
4. [Frontend Specification (React)](#4-frontend-specification-react)
5. [Backend Specification (Django)](#5-backend-specification-django)
6. [Database Schema](#6-database-schema)
7. [API Specification](#7-api-specification)
8. [Infrastructure & DevOps](#8-infrastructure--devops)
9. [SEO & Performance](#9-seo--performance)
10. [Testing Strategy](#10-testing-strategy)
11. [Deployment Checklist](#11-deployment-checklist)

---

## 1. Project Overview

### 1.1 Purpose

A high-performance personal portfolio and contact hub for Temple — a designer and developer offering UI/UX design, web development, branding, and CMS/SEO services. The site serves as a living showcase of selected work, an introduction to Temple's process and values, and a direct channel for inbound client inquiries.

### 1.2 Goals

| Priority | Goal |
|---|---|
| P0 | Convert visitors into qualified leads via the contact/CTA flow |
| P0 | Present selected projects with enough context to build trust |
| P1 | Communicate Temple's unique design + development positioning |
| P1 | Rank on Google for relevant freelance/agency search terms |
| P2 | Be maintainable solo — easy to add/update projects from an admin panel |

### 1.3 Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, Axios, Framer Motion |
| Styling | Tailwind CSS v4 + CSS custom properties (design tokens bridged via `@theme`) |
| State | React Query (server state), Zustand (UI state) |
| Backend | Python 3.12, Django 5.x, Django REST Framework |
| Auth | JWT via `djangorestframework-simplejwt` (admin only) |
| Database | PostgreSQL 16 |
| Media Storage | AWS S3 + CloudFront CDN |
| Email | Django + SendGrid (contact form submissions) |
| Caching | Redis (via `django-redis`) |
| Task Queue | Celery + Redis (email delivery, notifications) |
| Web Server | Gunicorn + Nginx |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Hosting | DigitalOcean Droplet (or Railway for quick deploy) |

---

## 2. Design System

### 2.1 Color Palette

Design tokens are defined once as CSS custom properties and surfaced to Tailwind via the `@theme` block in `globals.css`. This means you can use both `text-accent` (Tailwind utility) and `var(--color-accent)` (raw CSS) interchangeably — no duplication.

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  /* Backgrounds */
  --color-bg:             #FFFFFF;   /* Pure White */
  --color-surface:        #F8FAFB;   /* Off White */
  --color-card:           #F4F6F7;   /* Soft Gray */
  --color-dark-bg:        #0D2B36;   /* Petroleum */

  /* Typography */
  --color-text-primary:   #0D2B36;   /* Deep Petroleum */
  --color-text-secondary: #4A6570;   /* Slate Blue */

  /* Accent */
  --color-accent:         #C97C3D;   /* Copper */
  --color-accent-hover:   #B46C31;   /* Rich Copper */

  /* Borders & Utility */
  --color-border:         #E3E8EB;   /* Light Gray */
  --color-success:        #1F6B61;   /* Forest Teal */
}
```

With this setup, Tailwind generates utilities like `bg-dark-bg`, `text-accent`, `border-border`, `text-text-secondary` — all backed by the same token values. No config file needed with Tailwind v4's CSS-first approach.

**Usage examples:**
```jsx
// Tailwind utilities (preferred for layout + spacing)
<section className="bg-surface py-24 px-6">
  <h2 className="text-text-primary font-display text-4xl">Selected Work</h2>
  <span className="text-accent">impact.</span>
</section>

// Raw CSS variables (for dynamic values, animations, JS-driven styles)
style={{ borderColor: 'var(--color-accent)' }}
```

### 2.2 Typography

```css
/* Add to @theme block in globals.css */
@theme {
  /* ... colors above ... */

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
```

Tailwind generates `font-display` and `font-body` utilities automatically. Use `font-display` on headings and `font-body` as the base (set on `<body>`).

```css
/* Type scale — also registered in @theme for Tailwind text-* utilities */
@theme {
  --text-xs:   0.75rem;    /* 12px — labels, captions */
  --text-sm:   0.875rem;   /* 14px — meta, badges */
  --text-base: 1rem;       /* 16px — body copy */
  --text-lg:   1.125rem;   /* 18px — lead paragraphs */
  --text-xl:   1.25rem;    /* 20px — card titles */
  --text-2xl:  1.5rem;     /* 24px — section subtitles */
  --text-3xl:  1.875rem;   /* 30px — section headings */
  --text-4xl:  2.25rem;    /* 36px — page headings */
  --text-5xl:  3rem;       /* 48px — hero headline */
  --text-6xl:  3.75rem;    /* 60px — hero headline XL */

  --leading-tight:  1.2;
  --leading-snug:   1.375;
  --leading-normal: 1.6;
}
```

### 2.3 Spacing Scale

Tailwind v4 uses a default spacing scale by default. Override only the named semantic spacings your design cares about:

```css
@theme {
  --spacing-section: 96px;   /* Section vertical padding */
  --spacing-gutter:  24px;   /* Default horizontal gutter */
  --spacing-card:    32px;   /* Card inner padding */
}
```

Standard Tailwind spacing utilities (`p-6`, `py-24`, `gap-8`, etc.) work out of the box and are the default choice for layout. The semantic tokens above are for one-off tokens that don't map to a Tailwind step.

### 2.4 Component Tokens

```css
@theme {
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;

  --shadow-sm:   0 1px 3px rgba(13,43,54,0.06), 0 1px 2px rgba(13,43,54,0.04);
  --shadow-md:   0 4px 12px rgba(13,43,54,0.08), 0 2px 4px rgba(13,43,54,0.04);
  --shadow-lg:   0 12px 40px rgba(13,43,54,0.12);
  --shadow-card: 0 2px 8px rgba(13,43,54,0.06);
}
```

Tailwind generates `rounded-lg`, `shadow-card`, `shadow-md` etc. from these. Use Tailwind utilities in JSX; fall back to `var()` only inside `@keyframes` or JS style objects.

---

## 3. Information Architecture

### 3.1 Page Sections (Single Page)

```
/  (Home — single scrollable page)
├── Navbar (sticky)
├── Hero
├── Trusted By (logos)
├── Featured Work
├── About Me
├── Services
├── Process (optional section)
├── Testimonials (optional, data-driven)
├── CTA Banner
└── Footer

/projects/:slug  (individual project detail)
/admin/           (Django admin + custom dashboard)
```

### 3.2 Navigation Links

- Home
- About
- Services
- Work
- Blog _(future — backend-ready)_
- Contact → scrolls to CTA / opens modal

---

## 4. Frontend Specification (React)

### 4.1 Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/                  # Axios instances & endpoint functions
│   │   ├── client.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── assets/
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   ├── Card/
│   │   │   ├── SectionLabel/   # "FEATURED WORK" eyebrow labels
│   │   │   ├── Logo/
│   │   │   └── Spinner/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   └── Footer/
│   │   └── sections/
│   │       ├── Hero/
│   │       ├── TrustedBy/
│   │       ├── FeaturedWork/
│   │       ├── About/
│   │       ├── Services/
│   │       ├── Testimonials/
│   │       └── CTABanner/
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProjectDetail.jsx
│   ├── hooks/
│   │   ├── useProjects.js
│   │   └── useContactForm.js
│   ├── store/
│   │   └── uiStore.js          # Zustand: nav open, modal, theme
│   ├── styles/
│   │   ├── globals.css          # @import "tailwindcss", @theme tokens, resets
│   │   └── animations.css       # @keyframes, motion utilities
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

### 4.2 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "axios": "^1.7.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "react-helmet-async": "^2.0.0",
    "react-hook-form": "^7.52.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "vitest": "^1.6.0",
    "@testing-library/react": "^16.0.0"
  }
}
```

**Vite config** — add the Tailwind plugin (no PostCSS config needed with v4):

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 4.3 Component Specifications

#### `<Navbar />`

- **Behavior:** Fixed top, `bg-bg/95 backdrop-blur-md`. Adds `shadow-sm` class after 60px scroll (toggled via Zustand `uiStore`).
- **Logo:** `T.` wordmark in `font-display text-accent`.
- **Links:** `text-sm text-text-primary hover:text-accent transition-colors`.
- **CTA Button:** "LET'S TALK →" — `border border-accent text-accent hover:bg-accent hover:text-white transition-colors px-5 py-2 rounded-md`.
- **Mobile:** Hamburger at `md:hidden`. Slide-down menu with Framer Motion `AnimatePresence`.

#### `<Hero />`

- **Layout:** `grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center`. Left: headline stack + subtext + CTA. Right: macOS-frame browser mockup.
- **Headline:** `font-display text-5xl lg:text-6xl leading-tight text-text-primary`. Accent word in `text-accent`.
- **CTA:** "VIEW MY WORK →" — `bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-md font-medium transition-colors`.
- **Entrance:** Staggered Framer Motion fade-up for label → headline → body → button (0.1s delay each).

#### `<TrustedBy />`

- **Layout:** Horizontal marquee (CSS `animation: scroll` infinite) on mobile, static flex row on desktop.
- **Items:** Client/tool logos in `--color-text-secondary` at 60% opacity. Hover restores full opacity.
- **Label:** "TRUSTED BY" in `--text-xs`, `letter-spacing: 0.12em`, `--color-text-secondary`.

#### `<FeaturedWork />`

- **Layout:** Left label column (30%) + right project grid (70%) on desktop. Stacked on mobile.
- **Grid:** 3 project cards. Card dimensions: `aspect-ratio: 4/3`. Card border-radius: `--radius-lg`.
- **Card hover:** `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`.
- **Data source:** fetched from `/api/projects/?featured=true` via React Query.
- **"VIEW ALL PROJECTS →"** link in `--color-accent`.

**`<ProjectCard />` props:**
```typescript
interface ProjectCardProps {
  title: string;
  category: string;
  thumbnailUrl: string;
  slug: string;
  isFeatured?: boolean;
}
```

#### `<About />`

- **Layout:** Two columns. Left: image (portrait or workspace photo). Right: eyebrow + heading + body + 4 feature pills.
- **Feature pills:** Icon + title + one-line description. Icons: thin stroke SVGs (Lucide or custom).
- **Heading accent:** The word "real" in `--color-accent`, display font.

#### `<Services />`

- **Layout:** Left: eyebrow + heading. Right: 2×2 service card grid.
- **Service cards:** Icon (stroke, `--color-accent`), title, 1–2 sentence description, "LEARN MORE →" link.
- **Services:** UI/UX Design, Web Development, Branding, CMS & SEO.
- **Card background:** `bg-card`. Hover: `hover:bg-bg hover:shadow-md transition-all`.

#### `<CTABanner />`

- **Layout:** `bg-dark-bg py-16 px-8`. Single row: `flex items-center justify-between flex-wrap gap-6`.
- **Text:** "Have a project in mind?" — `font-display text-2xl text-white`. Subtext: `text-text-secondary text-base`.
- **Button:** "LET'S TALK →" — `bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-md transition-colors`.
- **Click action:** Opens `<ContactModal />` (Framer Motion `AnimatePresence`).

#### `<ContactModal />`

- **Fields:** Name, Email, Project Type (select), Budget range (select), Message (textarea).
- **Validation:** `react-hook-form` + inline error messages.
- **Submission:** `POST /api/contact/` — success toast via `react-hot-toast`, closes modal.
- **Accessibility:** Focus trap, `role="dialog"`, `aria-modal="true"`, ESC to close.

#### `<Footer />`

- **Layout:** `bg-dark-bg text-white py-12 px-6`. Logo left, nav links center, social icons right. Copyright bar beneath with `border-t border-white/10`.
- **Social icons:** LinkedIn, Dribbble, Twitter/X, Instagram — `text-text-secondary hover:text-accent transition-colors`.
- **Nav links:** `text-sm text-text-secondary hover:text-white transition-colors`.

### 4.4 Animations

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

| Element | Animation | Trigger |
|---|---|---|
| Hero text stack | fade-up stagger | Page load |
| Section headings | fade-up | Scroll into view (IntersectionObserver) |
| Project cards | fade-up stagger | Scroll into view |
| Navbar shadow | opacity 0→1 | Scroll Y > 60px |
| Contact modal | scale(0.95)→1 + opacity | Click trigger |
| Trusted by logos | opacity pulse | Hover |

### 4.5 Routing

```jsx
// App.jsx
<Routes>
  <Route path="/"              element={<Home />} />
  <Route path="/projects/:slug" element={<ProjectDetail />} />
  <Route path="*"              element={<NotFound />} />
</Routes>
```

### 4.6 Axios Client Setup

```js
// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT for authenticated requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
```

---

## 5. Backend Specification (Django)

### 5.1 Project Structure

```
backend/
├── config/
│   ├── settings.py         # Single settings file, env-driven
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── projects/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests/
│   ├── contact/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── tasks.py        # Celery: email delivery
│   │   └── tests/
│   ├── testimonials/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   └── core/               # Shared utils, base models, health check
│       ├── models.py
│       ├── utils.py
│       └── views.py
├── manage.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### 5.2 Python Dependencies

```text
# requirements.txt
Django==5.1.*
djangorestframework==3.15.*
djangorestframework-simplejwt==5.3.*
django-cors-headers==4.4.*
django-storages[s3]==1.14.*
django-environ==0.11.*
Pillow==10.4.*
psycopg[binary]==3.2.*
redis==5.0.*
django-redis==5.4.*
celery==5.4.*
sendgrid==6.11.*
django-filter==24.2
drf-spectacular==0.27.*
gunicorn==22.0.*
whitenoise==6.7.*
# Development & testing
django-debug-toolbar==4.4.*
factory-boy==3.3.*
pytest-django==4.8.*
pytest-cov==5.0.*
black==24.*
ruff==0.5.*
ipython==8.*
# Production monitoring
sentry-sdk[django]==2.10.*
```

### 5.3 Settings Overview

All environment-specific behaviour is driven by `.env` values read via `django-environ`. No settings splitting — `DEBUG=True` locally, `DEBUG=False` in production, same file.

```python
# config/settings.py (key excerpts)
import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()  # reads .env file

SECRET_KEY  = env('SECRET_KEY')
DEBUG       = env('DEBUG')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'storages',
    'django_filters',
    'drf_spectacular',
    # Local
    'apps.core',
    'apps.projects',
    'apps.contact',
    'apps.testimonials',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': env('REDIS_URL', default='redis://localhost:6379/1'),
    }
}

CELERY_BROKER_URL = env('REDIS_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = env('REDIS_URL', default='redis://localhost:6379/0')
```

---

## 6. Database Schema

### 6.1 Entity Relationship Diagram

```
┌─────────────────────┐       ┌────────────────────────┐
│      Project         │       │    ProjectImage         │
├─────────────────────┤       ├────────────────────────┤
│ id (UUID)           │──1:N──│ id (UUID)              │
│ title               │       │ project (FK)            │
│ slug (unique)        │       │ image                   │
│ category            │       │ alt_text                │
│ short_description   │       │ order                   │
│ full_description    │       └────────────────────────┘
│ thumbnail           │
│ live_url            │       ┌────────────────────────┐
│ github_url          │       │    ProjectTag           │
│ is_featured         │──M:M──│ name                   │
│ order               │       │ slug                   │
│ created_at          │       └────────────────────────┘
│ updated_at          │
└─────────────────────┘

┌─────────────────────┐
│   ContactSubmission  │
├─────────────────────┤
│ id (UUID)           │
│ name                │
│ email               │
│ project_type        │
│ budget_range        │
│ message             │
│ is_read             │
│ created_at          │
└─────────────────────┘

┌─────────────────────┐
│    Testimonial       │
├─────────────────────┤
│ id (UUID)           │
│ client_name         │
│ client_role         │
│ client_company      │
│ client_avatar       │
│ content             │
│ rating (1–5)        │
│ is_featured         │
│ order               │
└─────────────────────┘
```

### 6.2 Django Models

```python
# apps/projects/models.py
import uuid
from django.db import models
from django.utils.text import slugify


class ProjectTag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('ui_ux',      'UI/UX Design'),
        ('web_dev',    'Web Development'),
        ('branding',   'Branding'),
        ('cms_seo',    'CMS & SEO'),
    ]

    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title            = models.CharField(max_length=200)
    slug             = models.SlugField(unique=True, max_length=220)
    category         = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    short_description= models.CharField(max_length=300)
    full_description = models.TextField()
    thumbnail        = models.ImageField(upload_to='projects/thumbnails/')
    live_url         = models.URLField(blank=True)
    github_url       = models.URLField(blank=True)
    tags             = models.ManyToManyField(ProjectTag, blank=True)
    is_featured      = models.BooleanField(default=False)
    order            = models.PositiveIntegerField(default=0)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project  = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image    = models.ImageField(upload_to='projects/images/')
    alt_text = models.CharField(max_length=200, blank=True)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']


# apps/contact/models.py
class ContactSubmission(models.Model):
    BUDGET_CHOICES = [
        ('<2k',      'Under $2,000'),
        ('2k-5k',    '$2,000 – $5,000'),
        ('5k-10k',   '$5,000 – $10,000'),
        ('10k-20k',  '$10,000 – $20,000'),
        ('>20k',     '$20,000+'),
    ]
    PROJECT_TYPE_CHOICES = [
        ('ui_ux',    'UI/UX Design'),
        ('web_dev',  'Web Development'),
        ('branding', 'Branding'),
        ('cms_seo',  'CMS & SEO'),
        ('other',    'Other'),
    ]

    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name         = models.CharField(max_length=150)
    email        = models.EmailField()
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES)
    budget_range = models.CharField(max_length=10, choices=BUDGET_CHOICES, blank=True)
    message      = models.TextField(max_length=2000)
    is_read      = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.project_type} ({self.created_at:%Y-%m-%d})"
```

---

## 7. API Specification

Base URL: `/api/v1/`

### 7.1 Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/projects/` | Public | List projects (supports `?featured=true`, `?category=ui_ux`) |
| GET | `/projects/:slug/` | Public | Single project detail |
| POST | `/projects/` | Admin | Create project |
| PATCH | `/projects/:slug/` | Admin | Update project |
| DELETE | `/projects/:slug/` | Admin | Delete project |
| GET | `/testimonials/` | Public | List featured testimonials |
| POST | `/contact/` | Public | Submit contact form |
| GET | `/contact/` | Admin | List all submissions |
| PATCH | `/contact/:id/` | Admin | Mark as read |
| POST | `/auth/token/` | — | Obtain JWT |
| POST | `/auth/token/refresh/` | — | Refresh JWT |
| GET | `/schema/` | — | OpenAPI schema (drf-spectacular) |
| GET | `/health/` | — | Health check |

### 7.2 Example Response Shapes

**`GET /api/v1/projects/`**
```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "Mental Health Platform",
      "slug": "mental-health-platform",
      "category": "ui_ux",
      "category_display": "UI/UX Design",
      "short_description": "A calming digital space for mental wellness.",
      "thumbnail": "https://cdn.example.com/projects/thumbnails/mh.webp",
      "is_featured": true,
      "tags": ["react", "figma", "branding"],
      "order": 1
    }
  ]
}
```

**`POST /api/v1/contact/`**
```json
// Request
{
  "name": "Sarah Chen",
  "email": "sarah@example.com",
  "project_type": "web_dev",
  "budget_range": "5k-10k",
  "message": "Hi Temple, I love your work on the Architecture Studio project…"
}

// Response 201
{
  "id": "abc12345-...",
  "message": "Thanks Sarah, I'll be in touch within 24 hours."
}
```

### 7.3 Celery Task: Contact Email

```python
# apps/contact/tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_contact_notification(self, submission_id):
    from apps.contact.models import ContactSubmission
    try:
        sub = ContactSubmission.objects.get(id=submission_id)
        # Notify Temple
        send_mail(
            subject=f'New inquiry: {sub.project_type} from {sub.name}',
            message=render_to_string('contact/email_admin.txt', {'sub': sub}),
            from_email='noreply@temple.dev',
            recipient_list=['temple@temple.dev'],
        )
        # Auto-reply to client
        send_mail(
            subject='Thanks for reaching out — Temple',
            message=render_to_string('contact/email_client.txt', {'sub': sub}),
            from_email='temple@temple.dev',
            recipient_list=[sub.email],
        )
    except Exception as exc:
        raise self.retry(exc=exc)
```

---

## 8. Infrastructure & DevOps

### 8.1 Docker Compose

```yaml
# docker-compose.yml
version: '3.9'

services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: portfolio_db
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
    volumes:
      - ./backend:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    env_file: .env
    depends_on:
      - db
      - redis

  celery:
    build: ./backend
    command: celery -A config worker -l info -c 2
    env_file: .env
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      VITE_API_URL: http://localhost:8000/api/v1

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/static
      - media_volume:/media

volumes:
  postgres_data:
  redis_data:
  static_volume:
  media_volume:
```

### 8.2 Environment Variables

```bash
# .env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=temple.dev,www.temple.dev
DATABASE_URL=postgres://portfolio_user:password@db:5432/portfolio_db
REDIS_URL=redis://redis:6379/0
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=
AWS_S3_REGION_NAME=us-east-1
SENDGRID_API_KEY=
ADMIN_EMAIL=temple@temple.dev
CORS_ALLOWED_ORIGINS=https://temple.dev
```

### 8.3 GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r backend/requirements.txt
      - run: cd backend && pytest --cov=apps --cov-report=xml -v

  frontend-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd frontend && npm ci && npm run build
```

---

## 9. SEO & Performance

### 9.1 SEO

- `react-helmet-async` for dynamic `<title>`, `<meta description>`, Open Graph, and Twitter Card tags per page.
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`.
- `sitemap.xml` served via Django (`django.contrib.sitemaps`).
- `robots.txt` served statically.
- Structured data: `application/ld+json` — `Person` schema on home, `CreativeWork` on project pages.
- Canonical URLs on all pages.

### 9.2 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 200ms |
| TTFB | < 600ms |

### 9.3 Optimizations

- Images: WebP with `width` + `height` attrs, `loading="lazy"` on below-fold images, `srcset` via Django's `sorl-thumbnail` or S3 CloudFront transforms.
- Fonts: `<link rel="preconnect">` + `font-display: swap`.
- Vite code splitting: dynamic imports for `<ProjectDetail />` (lazy load).
- Django: `django-redis` caching on project list endpoint (cache timeout: 5 min, invalidate on save).
- Nginx: gzip compression, `Cache-Control` headers for static assets.

---

## 10. Testing Strategy

### 10.1 Backend Tests

```
backend/apps/projects/tests/
├── test_models.py      # Model creation, slug generation, ordering
├── test_serializers.py # Serializer validation
├── test_views.py       # API response shapes, permissions, filters
└── test_tasks.py       # Celery email tasks (mocked email backend)
```

**Targets:** 80%+ coverage on `apps/` using `pytest-django` + `factory-boy`.

### 10.2 Frontend Tests

```
frontend/src/components/sections/Hero/__tests__/Hero.test.jsx
frontend/src/hooks/__tests__/useContactForm.test.js
frontend/src/api/__tests__/contact.test.js
```

**Targets:** Unit tests on form validation, API utility functions; `@testing-library/react` for component smoke tests.

---

## 11. Deployment Checklist

- [ ] Set `DEBUG=False`, `ALLOWED_HOSTS`, `SECRET_KEY` in production env
- [ ] Run `python manage.py collectstatic`
- [ ] Run `python manage.py migrate`
- [ ] Confirm S3 bucket CORS policy allows frontend origin
- [ ] Confirm Celery worker is running and connected to Redis
- [ ] Set up SendGrid sender authentication for `temple@temple.dev`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Verify Django admin is accessible at `/admin/`
- [ ] Confirm `/api/v1/health/` returns `200 OK`
- [ ] Enable HTTPS (Let's Encrypt via Certbot on Nginx)
- [ ] Add `SECURE_HSTS_SECONDS`, `SECURE_SSL_REDIRECT` to production settings
- [ ] Connect Sentry DSN in production settings
- [ ] Run Lighthouse audit and resolve any score < 90
- [ ] Submit sitemap to Google Search Console

---

_Spec version 1.1 — Temple Portfolio | Prepared June 2026_
