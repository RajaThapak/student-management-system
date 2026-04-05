from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import LoginSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
	serializer_class = RegisterSerializer
	permission_classes = [permissions.AllowAny]

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response(
			{
				"message": "User registered successfully",
				"user": {
					"id": user.id,
					"username": user.username,
					"email": user.email,
				},
			},
			status=201,
		)


class LoginView(TokenObtainPairView):
	serializer_class = LoginSerializer
	permission_classes = [permissions.AllowAny]
