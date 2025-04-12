from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

frontend_urls = [
    re_path(r"^.*$", TemplateView.as_view(template_name="frontend/index.html"), name="home"),
]

urlpatterns = [
    path("adminpanel/", admin.site.urls),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/", include("chat.urls")),
    path('accounts/', include('allauth.urls')),
] + frontend_urls

# Add this line for serving static files in production
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
