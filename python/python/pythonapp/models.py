from django.db import models


# Create your models here.
class Author(models.Model):
    first_name = models.CharField(max_length=255, blank=False)
    last_name = models.CharField(max_length=255, blank=False)


class Book(models.Model):
    title = models.CharField(max_length=255, blank=False)
    genre = models.CharField(max_length=255, blank=False)
    published_date = models.DateField(blank=False)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
