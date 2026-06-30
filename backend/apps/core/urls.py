from django.urls import path
from .views import health_check, pexels_search

urlpatterns = [
    path('', health_check),
    path('pexels/search/', pexels_search, name='pexels-search'),
]
