from django.contrib.sitemaps import Sitemap
from django.conf import settings

_FRONTEND = getattr(settings, 'FRONTEND_URL', 'https://templelomotey.work')
_DOMAIN = _FRONTEND.replace('https://', '').replace('http://', '').rstrip('/')


class FrontendSitemap(Sitemap):
    """Base class that serves URLs pointing at the frontend domain."""
    protocol = 'https'

    def get_urls(self, page=1, site=None, protocol=None):
        protocol = self.get_protocol(protocol)
        return self._urls(page, protocol, _DOMAIN)


class StaticSitemap(FrontendSitemap):
    changefreq = 'monthly'
    priority = 1.0

    def items(self):
        return ['/', '/blog']

    def location(self, item):
        return item


class ProjectSitemap(FrontendSitemap):
    changefreq = 'monthly'
    priority = 0.8

    def items(self):
        from apps.projects.models import Project
        return Project.objects.all()

    def location(self, obj):
        return f'/projects/{obj.slug}'

    def lastmod(self, obj):
        return obj.updated_at


class BlogSitemap(FrontendSitemap):
    changefreq = 'weekly'
    priority = 0.7

    def items(self):
        from apps.blog.models import BlogPost
        return BlogPost.objects.filter(is_published=True)

    def location(self, obj):
        return f'/blog/{obj.slug}'

    def lastmod(self, obj):
        return obj.updated_at
