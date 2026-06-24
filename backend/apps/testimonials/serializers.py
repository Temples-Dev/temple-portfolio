from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_role', 'client_company',
            'client_avatar', 'content', 'rating', 'is_featured', 'order',
        ]
