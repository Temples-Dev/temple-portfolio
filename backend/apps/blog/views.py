from rest_framework import generics, permissions
from .models import BlogPost
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer
from .filters import BlogPostFilter


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.AllowAny]
    filterset_class = BlogPostFilter

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True).prefetch_related('tags')


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True).prefetch_related('tags')
