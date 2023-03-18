from django.db import models
from datetime import date

# Create your models here.
class Todo(models.Model):
    VALID_STATUS = (
        ("INCOMPLETE", "INCOMPLETE"),
        ("COMPLETE", "COMPLETE")
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=VALID_STATUS, default="INCOMPLETE")
    date = models.DateField(default=date.today)