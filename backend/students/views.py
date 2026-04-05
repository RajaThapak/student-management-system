from django.db.models import Q
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	serializer_class = StudentSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		queryset = Student.objects.all()
		search = self.request.query_params.get("search")
		course = self.request.query_params.get("course")
		year = self.request.query_params.get("year")

		if search:
			queryset = queryset.filter(
				Q(name__icontains=search)
				| Q(email__icontains=search)
				| Q(course__icontains=search)
			)

		if course:
			queryset = queryset.filter(course__icontains=course)

		if year:
			queryset = queryset.filter(year=year)

		return queryset


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
	total_students = Student.objects.count()
	return Response({"total_students": total_students}, status=status.HTTP_200_OK)
