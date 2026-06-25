import logging
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer, ContactSubmissionAdminSerializer
from .tasks import send_contact_notification

logger = logging.getLogger(__name__)


class ContactSubmitView(generics.CreateAPIView):
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()
        try:
            send_contact_notification(str(submission.id))
        except Exception:
            logger.exception("Email send failed for submission %s", submission.id)
            return Response(
                {
                    'id': str(submission.id),
                    'message': f"Thanks {submission.name}, your message was saved but email delivery failed — I'll still be in touch.",
                    'email_error': True,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                'id': str(submission.id),
                'message': f"Thanks {submission.name}, I'll be in touch within 24 hours.",
            },
            status=status.HTTP_201_CREATED,
        )


class ContactListView(generics.ListAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [permissions.IsAdminUser]


class ContactMarkReadView(generics.UpdateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ['patch']
