from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_contact_notification(self, submission_id):
    from .models import ContactSubmission
    try:
        sub = ContactSubmission.objects.get(id=submission_id)

        # Notify Temple
        send_mail(
            subject=f'New inquiry: {sub.get_project_type_display()} from {sub.name}',
            message=(
                f'Name: {sub.name}\n'
                f'Email: {sub.email}\n'
                f'Project: {sub.get_project_type_display()}\n'
                f'Budget: {sub.get_budget_range_display() or "Not specified"}\n\n'
                f'Message:\n{sub.message}'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=False,
        )

        # Auto-reply to client
        send_mail(
            subject='Thanks for reaching out — Temple',
            message=(
                f'Hi {sub.name},\n\n'
                'Thanks for getting in touch! I\'ve received your message and will '
                'get back to you within 24 hours.\n\n'
                'Looking forward to hearing more about your project.\n\n'
                'Temple'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[sub.email],
            fail_silently=False,
        )
    except Exception as exc:
        raise self.retry(exc=exc)
