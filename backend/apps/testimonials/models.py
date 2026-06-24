import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Testimonial(models.Model):
    id             = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_name    = models.CharField(max_length=150)
    client_role    = models.CharField(max_length=150)
    client_company = models.CharField(max_length=150)
    client_avatar  = models.ImageField(upload_to='testimonials/', blank=True)
    content        = models.TextField()
    rating         = models.PositiveSmallIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    is_featured = models.BooleanField(default=False)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.client_name} — {self.client_company}'
