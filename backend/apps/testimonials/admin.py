from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display  = ['client_name', 'client_company', 'rating', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']
    list_filter   = ['is_featured', 'rating']
    search_fields = ['client_name', 'client_company', 'content']
