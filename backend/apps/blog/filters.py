import django_filters
from .models import BlogPost


class BlogPostFilter(django_filters.FilterSet):
    tag = django_filters.CharFilter(field_name='tags__slug', lookup_expr='exact')

    class Meta:
        model = BlogPost
        fields = ['tag']
