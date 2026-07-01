from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets, permissions
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer, ProjectWriteSerializer
from .filters import ProjectFilter


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.prefetch_related('tags', 'images').all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProjectFilter
    ordering_fields = ['order', 'created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        if self.action in ('create', 'update', 'partial_update'):
            return ProjectWriteSerializer
        return ProjectListSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
