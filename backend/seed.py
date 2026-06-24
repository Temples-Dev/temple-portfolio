"""
Dev seed script — run with: uv run python manage.py shell < seed.py
Creates sample projects, testimonials for local development.
"""
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from apps.projects.models import Project, ProjectTag
from apps.testimonials.models import Testimonial

# Tags
tags = {}
for name in ['React', 'Django', 'Figma', 'Tailwind', 'Branding', 'SEO', 'TypeScript']:
    tag, _ = ProjectTag.objects.get_or_create(name=name)
    tags[name] = tag

# Projects
projects_data = [
    {
        'title': 'Mental Health Platform',
        'category': 'ui_ux',
        'short_description': 'A calming digital space for mental wellness and therapy management.',
        'full_description': (
            'Designed and built a full-stack web application for a mental health startup. '
            'The platform connects clients with therapists, tracks mood over time, and '
            'provides a resource library. Research-driven UX with WCAG AA accessibility.\n\n'
            'Key challenges included building a calming visual language that reduced anxiety '
            'while meeting strict data privacy requirements.'
        ),
        'is_featured': True,
        'order': 1,
        'tag_names': ['React', 'Django', 'Figma'],
    },
    {
        'title': 'Architecture Studio',
        'category': 'web_dev',
        'short_description': 'Bold, minimalist portfolio for a leading architecture firm.',
        'full_description': (
            'A high-performance portfolio site for a boutique architecture studio. '
            'Features a fullscreen project gallery, smooth page transitions, and a '
            'custom CMS built on Django for easy project management.\n\n'
            'Achieved a Lighthouse score of 97 across all metrics.'
        ),
        'is_featured': True,
        'order': 2,
        'tag_names': ['React', 'Django', 'Tailwind'],
    },
    {
        'title': 'E-commerce Rebrand',
        'category': 'branding',
        'short_description': 'End-to-end brand identity for an independent fashion label.',
        'full_description': (
            'Complete visual identity system for an independent fashion brand — logo, '
            'colour palette, typography, packaging, and brand guidelines. '
            'The rebrand led to a 35% increase in social media engagement within 3 months.'
        ),
        'is_featured': True,
        'order': 3,
        'tag_names': ['Figma', 'Branding'],
    },
    {
        'title': 'SaaS Dashboard',
        'category': 'ui_ux',
        'short_description': 'Complex data dashboard redesign for a B2B analytics tool.',
        'full_description': (
            'Redesigned the core dashboard of a B2B SaaS tool used by 40,000+ users. '
            'Reduced task completion time by 28% through information architecture improvements '
            'and a clean, consistent component library.'
        ),
        'is_featured': False,
        'order': 4,
        'tag_names': ['Figma', 'TypeScript', 'React'],
    },
]

for data in projects_data:
    tag_names = data.pop('tag_names')
    proj, created = Project.objects.get_or_create(
        slug=data['title'].lower().replace(' ', '-'),
        defaults=data,
    )
    if created:
        proj.tags.set([tags[n] for n in tag_names if n in tags])
        print(f'  Created project: {proj.title}')
    else:
        print(f'  Exists: {proj.title}')

# Testimonials
testimonials_data = [
    {
        'client_name': 'Sarah Chen',
        'client_role': 'Founder',
        'client_company': 'MindSpace',
        'content': "Temple delivered a product that exceeded every brief. The attention to detail and speed of execution was unlike anything I've seen from a solo freelancer.",
        'rating': 5,
        'is_featured': True,
        'order': 1,
    },
    {
        'client_name': 'James Okafor',
        'client_role': 'Marketing Director',
        'client_company': 'Meridian Studio',
        'content': 'Our bounce rate dropped 40% after the redesign. Temple understands both design and conversion — rare combination.',
        'rating': 5,
        'is_featured': True,
        'order': 2,
    },
    {
        'client_name': 'Priya Nair',
        'client_role': 'CEO',
        'client_company': 'Leafwell',
        'content': 'Working with Temple felt like having a full agency — strategy, design, and development in one person. Highly recommend.',
        'rating': 5,
        'is_featured': True,
        'order': 3,
    },
]

for data in testimonials_data:
    t, created = Testimonial.objects.get_or_create(
        client_name=data['client_name'],
        defaults=data,
    )
    if created:
        print(f'  Created testimonial: {t.client_name}')
    else:
        print(f'  Exists: {t.client_name}')

print('\nSeed complete.')
