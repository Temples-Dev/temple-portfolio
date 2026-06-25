from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import BlogPost, BlogTag


@admin.register(BlogTag)
class BlogTagAdmin(ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display  = ['title', 'is_published', 'published_at', 'created_at']
    list_editable = ['is_published']
    list_filter   = ['is_published', 'tags']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
