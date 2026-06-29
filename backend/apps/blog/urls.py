from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, BlogPostCreateView, BlogPostUpdateView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('create/', BlogPostCreateView.as_view(), name='blog-create'),
    path('<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
    path('<slug:slug>/edit/', BlogPostUpdateView.as_view(), name='blog-update'),
]
