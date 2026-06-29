from django.utils import timezone
from django.db.models import Q
from rest_framework import generics, permissions
from .models import BlogPost
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer, BlogPostWriteSerializer
from .filters import BlogPostFilter


def published_queryset():
    """Posts that are live: explicitly published, or scheduled with a past publish time."""
    return BlogPost.objects.filter(
        Q(status=BlogPost.STATUS_PUBLISHED) |
        Q(status=BlogPost.STATUS_SCHEDULED, published_at__lte=timezone.now())
    ).prefetch_related('tags')


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.AllowAny]
    filterset_class = BlogPostFilter

    def get_queryset(self):
        return published_queryset()


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return published_queryset()


class BlogPostCreateView(generics.CreateAPIView):
    serializer_class = BlogPostWriteSerializer
    permission_classes = [permissions.IsAdminUser]


class BlogPostUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = BlogPostWriteSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'slug'
    queryset = BlogPost.objects.all()
