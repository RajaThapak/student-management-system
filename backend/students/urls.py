from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import StudentViewSet, dashboard_stats

router = DefaultRouter()
router.register("students", StudentViewSet, basename="students")

urlpatterns = [
    path("dashboard/stats/", dashboard_stats, name="dashboard_stats"),
    path("", include(router.urls)),
]
