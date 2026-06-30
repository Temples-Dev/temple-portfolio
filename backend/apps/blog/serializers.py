from rest_framework import serializers
from .models import BlogPost, BlogTag


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = ['name', 'slug']


def _cover_image(obj):
    """Return cover_image_url if set, else the Cloudinary URL, else empty string."""
    if obj.cover_image_url:
        return obj.cover_image_url
    if obj.cover_image:
        return obj.cover_image.url
    return ''


class BlogPostListSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    read_time_minutes = serializers.IntegerField(read_only=True)
    cover_image = serializers.SerializerMethodField()

    def get_cover_image(self, obj):
        return _cover_image(obj)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'tags', 'published_at', 'read_time_minutes',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    read_time_minutes = serializers.IntegerField(read_only=True)
    is_published = serializers.BooleanField(read_only=True)
    cover_image = serializers.SerializerMethodField()

    def get_cover_image(self, obj):
        return _cover_image(obj)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'cover_image',
            'tags', 'status', 'is_published', 'published_at', 'read_time_minutes',
            'created_at', 'updated_at',
        ]


class BlogPostWriteSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False,
        default=list,
        help_text='List of tag names — created automatically if they do not exist.',
    )

    class Meta:
        model = BlogPost
        fields = [
            'title', 'slug', 'excerpt', 'content', 'cover_image', 'cover_image_url',
            'tags', 'status', 'published_at',
        ]
        extra_kwargs = {
            'slug': {'required': False},
            'cover_image': {'required': False},
            'cover_image_url': {'required': False},
            'published_at': {'required': False},
        }

    def _sync_tags(self, instance, tag_names):
        tags = []
        for name in tag_names:
            tag, _ = BlogTag.objects.get_or_create(
                name=name,
                defaults={'slug': name.lower().replace(' ', '-')},
            )
            tags.append(tag)
        instance.tags.set(tags)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['tags'] = [tag.name for tag in instance.tags.all()]
        data['cover_image'] = _cover_image(instance)
        return data

    def create(self, validated_data):
        tag_names = validated_data.pop('tags', [])
        post = super().create(validated_data)
        self._sync_tags(post, tag_names)
        return post

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tags', None)
        post = super().update(instance, validated_data)
        if tag_names is not None:
            self._sync_tags(post, tag_names)
        return post
