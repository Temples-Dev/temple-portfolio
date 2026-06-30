from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.contrib.inlines.admin import TabularInline
from .models import Project, ProjectImage, ProjectTag


class ProjectImageInline(TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'alt_text', 'order']


@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display  = ['title', 'category', 'is_featured', 'order', 'updated_at']
    list_editable = ['is_featured', 'order']
    list_filter   = ['category', 'is_featured']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    inlines = [ProjectImageInline]
    ordering = ['order', '-created_at']
    fieldsets = [
        (None, {'fields': ['title', 'slug', 'category', 'short_description', 'full_description', 'thumbnail', 'thumbnail_url', 'tags']}),
        ('Links', {'fields': ['live_url', 'github_url']}),
        ('Display', {'fields': ['is_featured', 'order']}),
    ]


@admin.register(ProjectTag)
class ProjectTagAdmin(ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ProjectImage)
class ProjectImageAdmin(ModelAdmin):
    list_display = ['project', 'alt_text', 'order']
    list_filter  = ['project']
