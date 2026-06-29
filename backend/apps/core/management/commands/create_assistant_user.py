import secrets
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a staff assistant user for API access (blog post publishing)'

    def handle(self, *args, **options):
        username = 'assistant'

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(
                f'User "{username}" already exists. '
                'To reset the password run: python manage.py changepassword assistant'
            ))
            return

        password = secrets.token_urlsafe(20)
        User.objects.create_user(
            username=username,
            password=password,
            is_staff=True,
            is_superuser=False,
        )

        self.stdout.write(self.style.SUCCESS('Assistant user created.\n'))
        self.stdout.write(f'  Username : {username}')
        self.stdout.write(f'  Password : {password}\n')
        self.stdout.write('Get a JWT token:')
        self.stdout.write('  POST /api/v1/auth/token/')
        self.stdout.write('  {"username": "assistant", "password": "<password above>"}\n')
        self.stdout.write('Use the access token as:')
        self.stdout.write('  Authorization: Bearer <access_token>')
