from django.db import models


class Student(models.Model):
	name = models.CharField(max_length=120)
	email = models.EmailField(unique=True)
	course = models.CharField(max_length=120, db_index=True)
	year = models.PositiveSmallIntegerField(db_index=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.name} ({self.course} - Year {self.year})"
