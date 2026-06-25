from rest_framework import serializers
from .models import BlogPost, BlogTag


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = ['name', 'slug']


class BlogPostListSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    read_time_minutes = serializers.IntegerField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'tags', 'published_at', 'read_time_minutes',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    read_time_minutes = serializers.IntegerField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'cover_image',
            'tags', 'is_published', 'published_at', 'read_time_minutes',
            'created_at', 'updated_at',
        ]
