from .models import Author, Book


def get_authors():
    return Author.objects.all()
