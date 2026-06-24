from rest_framework import generics, permissions
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialListView(generics.ListAPIView):
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Testimonial.objects.all()
        if self.request.query_params.get('featured'):
            qs = qs.filter(is_featured=True)
        return qs
