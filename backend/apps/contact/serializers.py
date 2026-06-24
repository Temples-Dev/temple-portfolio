from rest_framework import serializers
from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'project_type', 'budget_range', 'message']
        read_only_fields = ['id']

    def validate_message(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError('Message must be at least 20 characters.')
        return value


class ContactSubmissionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'
