from rest_framework import serializers
from .models import Project, ProjectImage, ProjectTag


class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ['name', 'slug']


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'alt_text', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_display',
            'short_description', 'thumbnail', 'is_featured', 'tags', 'order',
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    tags = serializers.StringRelatedField(many=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_display',
            'short_description', 'full_description', 'thumbnail',
            'live_url', 'github_url', 'tags', 'images',
            'is_featured', 'order', 'created_at', 'updated_at',
        ]
