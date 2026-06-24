from django.contrib import admin
from .models import Project, ProjectImage, ProjectTag


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'alt_text', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'category', 'is_featured', 'order', 'updated_at']
    list_editable = ['is_featured', 'order']
    list_filter   = ['category', 'is_featured']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    inlines = [ProjectImageInline]
    ordering = ['order', '-created_at']


@admin.register(ProjectTag)
class ProjectTagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'alt_text', 'order']
    list_filter  = ['project']
