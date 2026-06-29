import uuid
from django.db import models
from django.utils.text import slugify


class ProjectTag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('ui_ux',    'UI/UX Design'),
        ('web_dev',  'Web Development'),
        ('branding', 'Branding'),
        ('cms_seo',  'CMS & SEO'),
    ]

    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title            = models.CharField(max_length=200)
    slug             = models.SlugField(unique=True, max_length=220)
    category         = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    thumbnail        = models.ImageField(upload_to='projects/thumbnails/', blank=True, max_length=500)
    live_url         = models.URLField(blank=True)
    github_url       = models.URLField(blank=True)
    tags             = models.ManyToManyField(ProjectTag, blank=True, related_name='projects')
    is_featured      = models.BooleanField(default=False)
    order            = models.PositiveIntegerField(default=0)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project  = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image    = models.ImageField(upload_to='projects/images/', max_length=500)
    alt_text = models.CharField(max_length=200, blank=True)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.project.title} — image {self.order}'
