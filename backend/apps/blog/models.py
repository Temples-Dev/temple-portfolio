import uuid
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class BlogTag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    STATUS_DRAFT     = 'draft'
    STATUS_SCHEDULED = 'scheduled'
    STATUS_PUBLISHED = 'published'
    STATUS_CHOICES   = [
        (STATUS_DRAFT,     'Draft'),
        (STATUS_SCHEDULED, 'Scheduled'),
        (STATUS_PUBLISHED, 'Published'),
    ]

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title       = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True, max_length=220)
    excerpt     = models.CharField(max_length=500)
    content     = models.TextField(help_text='HTML content')
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True)
    tags        = models.ManyToManyField(BlogTag, blank=True, related_name='posts')
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_DRAFT, db_index=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        # Auto-set published_at when first publishing
        if self.status == self.STATUS_PUBLISHED and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    @property
    def is_published(self) -> bool:
        if self.status == self.STATUS_PUBLISHED:
            return True
        if self.status == self.STATUS_SCHEDULED and self.published_at:
            return self.published_at <= timezone.now()
        return False

    @property
    def read_time_minutes(self):
        return max(1, round(len(self.content.split()) / 200))

    def __str__(self):
        return self.title
