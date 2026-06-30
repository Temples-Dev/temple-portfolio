import requests as http_requests

from django.conf import settings
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
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


@api_view(['GET'])
@permission_classes([IsAdminUser])
def pexels_search(request):
    """Proxy Pexels image search for admin use — returns curated photo list."""
    api_key = getattr(settings, 'PEXELS_API_KEY', '')
    if not api_key:
        return Response({'error': 'PEXELS_API_KEY not configured'}, status=503)

    q = request.query_params.get('q', '').strip()
    if not q:
        return Response({'error': 'q param required'}, status=400)

    per_page = min(int(request.query_params.get('per_page', 15)), 30)
    page = int(request.query_params.get('page', 1))

    resp = http_requests.get(
        'https://api.pexels.com/v1/search',
        params={'query': q, 'per_page': per_page, 'page': page, 'orientation': 'landscape'},
        headers={'Authorization': api_key},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()

    photos = [
        {
            'id': p['id'],
            'url': p['src']['large'],
            'thumb': p['src']['medium'],
            'photographer': p['photographer'],
            'alt': p.get('alt', ''),
        }
        for p in data.get('photos', [])
    ]
    return Response({
        'photos': photos,
        'total_results': data.get('total_results', 0),
        'page': page,
    })
