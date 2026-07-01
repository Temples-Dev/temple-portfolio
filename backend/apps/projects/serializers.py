from rest_framework import serializers
from django.utils.text import slugify
from .models import Project, ProjectImage, ProjectTag


class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ['name', 'slug']


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'alt_text', 'order']


def _thumbnail(obj):
    if obj.thumbnail_url:
        return obj.thumbnail_url
    if obj.thumbnail:
        return obj.thumbnail.url
    return ''


class ProjectListSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    tags = serializers.StringRelatedField(many=True)
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        return _thumbnail(obj)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_display',
            'short_description', 'thumbnail', 'is_featured', 'tags', 'order',
        ]


class ProjectWriteSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False,
        default=list,
        write_only=True,
        help_text='List of tag names — created automatically if they do not exist.',
    )
    thumbnail = serializers.ImageField(required=False, write_only=True)

    class Meta:
        model = Project
        fields = [
            'title', 'slug', 'category', 'short_description', 'full_description',
            'thumbnail', 'thumbnail_url', 'live_url', 'github_url',
            'tags', 'is_featured', 'order',
        ]
        extra_kwargs = {
            'slug': {'required': False},
            'thumbnail_url': {'required': False},
            'live_url': {'required': False},
            'github_url': {'required': False},
        }

    def _sync_tags(self, instance, tag_names):
        tags = []
        for name in tag_names:
            tag, _ = ProjectTag.objects.get_or_create(
                name=name,
                defaults={'slug': slugify(name)},
            )
            tags.append(tag)
        instance.tags.set(tags)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['tags'] = [tag.name for tag in instance.tags.all()]
        data['thumbnail'] = _thumbnail(instance)
        return data

    def create(self, validated_data):
        tag_names = validated_data.pop('tags', [])
        project = super().create(validated_data)
        self._sync_tags(project, tag_names)
        return project

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tags', None)
        project = super().update(instance, validated_data)
        if tag_names is not None:
            self._sync_tags(project, tag_names)
        return project


class ProjectDetailSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    tags = serializers.StringRelatedField(many=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        return _thumbnail(obj)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_display',
            'short_description', 'full_description', 'thumbnail',
            'live_url', 'github_url', 'tags', 'images',
            'is_featured', 'order', 'created_at', 'updated_at',
        ]
