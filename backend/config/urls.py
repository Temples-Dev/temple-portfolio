from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.core.sitemaps import StaticSitemap, ProjectSitemap, BlogSitemap

sitemaps = {
    'static': StaticSitemap,
    'projects': ProjectSitemap,
    'blog': BlogSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    path('api/v1/', include([
        path('projects/', include('apps.projects.urls')),
        path('contact/', include('apps.contact.urls')),
        path('testimonials/', include('apps.testimonials.urls')),
        path('blog/', include('apps.blog.urls')),
        path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('health/', include('apps.core.urls')),
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    ])),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
