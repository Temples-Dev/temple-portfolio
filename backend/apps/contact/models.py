import uuid
from django.db import models


class ContactSubmission(models.Model):
    BUDGET_CHOICES = [
        ('<2k',     'Under $2,000'),
        ('2k-5k',   '$2,000 – $5,000'),
        ('5k-10k',  '$5,000 – $10,000'),
        ('10k-20k', '$10,000 – $20,000'),
        ('>20k',    '$20,000+'),
    ]
    PROJECT_TYPE_CHOICES = [
        ('ui_ux',    'UI/UX Design'),
        ('web_dev',  'Web Development'),
        ('branding', 'Branding'),
        ('cms_seo',  'CMS & SEO'),
        ('other',    'Other'),
    ]

    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name         = models.CharField(max_length=150)
    email        = models.EmailField()
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES)
    budget_range = models.CharField(max_length=10, choices=BUDGET_CHOICES, blank=True)
    message      = models.TextField(max_length=2000)
    is_read      = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.project_type} ({self.created_at:%Y-%m-%d})'
