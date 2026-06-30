from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import BlogPost, BlogTag


@admin.register(BlogTag)
class BlogTagAdmin(ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display   = ['title', 'status', 'published_at', 'created_at']
    list_editable  = ['status']
    list_filter    = ['status', 'tags']
    search_fields  = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    ordering       = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = [
        (None, {'fields': ['title', 'slug', 'excerpt', 'content', 'cover_image', 'cover_image_url', 'tags']}),
        ('Publishing', {'fields': ['status', 'published_at']}),
        ('Timestamps', {'fields': ['created_at', 'updated_at']}),
    ]
