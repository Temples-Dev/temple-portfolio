from pathlib import Path
from django.urls import reverse_lazy
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env('SECRET_KEY', default='django-insecure-dev-key-change-in-production')
DEBUG = env('DEBUG', default=True)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

INSTALLED_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    'unfold.contrib.inlines',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    # Third-party (anymail)
    'anymail',
    # Local
    'apps.core',
    'apps.projects',
    'apps.contact',
    'apps.testimonials',
    'apps.blog',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': env.db('DATABASE_URL', default=f'sqlite:///{BASE_DIR / "db.sqlite3"}')
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF
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

# CORS
CORS_ALLOWED_ORIGINS = env.list(
    'CORS_ALLOWED_ORIGINS',
    default=['http://localhost:5173', 'http://localhost:5174'],
)
CORS_ALLOW_CREDENTIALS = True

# Cache (Redis in prod, local-mem in dev)
_redis_url = env('REDIS_URL', default='')
if _redis_url:
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': _redis_url,
            'OPTIONS': {'CLIENT_CLASS': 'django_redis.client.DefaultClient'},
        }
    }
else:
    CACHES = {'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}}

# Celery
CELERY_BROKER_URL = env('REDIS_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = env('REDIS_URL', default='redis://localhost:6379/0')
CELERY_TASK_ALWAYS_EAGER = not bool(_redis_url)  # run tasks inline when no Redis

# Email — console in dev, Resend in prod (set EMAIL_BACKEND + RESEND_API_KEY)
EMAIL_BACKEND = env(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.console.EmailBackend',
)
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='noreply@temple.dev')
FRONTEND_URL = env('FRONTEND_URL', default='https://templelomotey.work')
ADMIN_EMAIL = env('ADMIN_EMAIL', default='temple@temple.dev')
ANYMAIL = {
    'RESEND_API_KEY': env('RESEND_API_KEY', default=''),
}

# drf-spectacular
SPECTACULAR_SETTINGS = {
    'TITLE': 'Temple Portfolio API',
    'DESCRIPTION': 'Backend API for the Temple portfolio site.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# Django Unfold admin — palette derived from frontend brand tokens
UNFOLD = {
    "SITE_TITLE": "Temple Admin",
    "SITE_HEADER": "Temple Portfolio",
    "SITE_SYMBOL": "edit_square",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "Content",
                "separator": False,
                "items": [
                    {"title": "Blog Posts", "icon": "article",     "link": reverse_lazy("admin:blog_blogpost_changelist")},
                    {"title": "Tags",       "icon": "label",       "link": reverse_lazy("admin:blog_blogtag_changelist")},
                    {"title": "Projects",   "icon": "work",        "link": reverse_lazy("admin:projects_project_changelist")},
                ],
            },
            {
                "title": "Settings",
                "separator": True,
                "items": [
                    {"title": "Users",  "icon": "person",      "link": reverse_lazy("admin:auth_user_changelist")},
                    {"title": "Groups", "icon": "group",       "link": reverse_lazy("admin:auth_group_changelist")},
                ],
            },
        ],
    },
    "COLORS": {
        "primary": {
            "50":  "252 241 228",
            "100": "248 226 199",
            "200": "240 204 161",
            "300": "228 175 117",
            "400": "216 150 82",
            "500": "201 124 61",   # #C97C3D accent
            "600": "180 108 49",   # #B46C31 accent-hover
            "700": "145 84 37",
            "800": "105 61 27",
            "900": "70 41 18",
            "950": "42 24 10",
        },
    },
}

# Production hardening (no-op when DEBUG=True)
# SECURE_SSL_REDIRECT is intentionally absent — Coolify terminates TLS; setting
# it would cause redirect loops since Coolify sends HTTP internally to gunicorn.
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_HSTS_SECONDS = 31536000
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
