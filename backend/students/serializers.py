from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "name", "email", "course", "year", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_year(self, value):
        if value < 1 or value > 10:
            raise serializers.ValidationError("Year must be between 1 and 10.")
        return value
