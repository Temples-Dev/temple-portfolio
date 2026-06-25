from django.conf import settings
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    try:
        connection.ensure_connection()
        db_ok = True
    except Exception:
        db_ok = False

    backend = settings.EMAIL_BACKEND
    resend_key = getattr(settings, 'ANYMAIL', {}).get('RESEND_API_KEY', '')

    return Response({
        'status': 'ok' if db_ok else 'degraded',
        'db': db_ok,
        'email': {
            'backend': backend.split('.')[-1],
            'resend_configured': bool(resend_key),
            'from': settings.DEFAULT_FROM_EMAIL,
            'admin': settings.ADMIN_EMAIL,
        },
    })
