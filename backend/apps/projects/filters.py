import django_filters
from .models import Project


class ProjectFilter(django_filters.FilterSet):
    featured = django_filters.BooleanFilter(field_name='is_featured')
    category = django_filters.CharFilter(field_name='category', lookup_expr='exact')

    class Meta:
        model = Project
        fields = ['featured', 'category']
