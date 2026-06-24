from django.urls import path
from .views import ContactSubmitView, ContactListView, ContactMarkReadView

urlpatterns = [
    path('', ContactSubmitView.as_view(), name='contact-submit'),
    path('list/', ContactListView.as_view(), name='contact-list'),
    path('<uuid:pk>/', ContactMarkReadView.as_view(), name='contact-mark-read'),
]
