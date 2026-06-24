from django.contrib import admin
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'project_type', 'budget_range', 'is_read', 'created_at']
    list_filter   = ['project_type', 'is_read', 'created_at']
    list_editable = ['is_read']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['id', 'name', 'email', 'project_type', 'budget_range', 'message', 'created_at']
    ordering = ['-created_at']

    def has_add_permission(self, request):
        return False
