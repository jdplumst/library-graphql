import datetime
import strawberry
from typing import List
from pythonapp import models


@strawberry.django.type(models.Book)
class BookType:
    id: int
    title: str
    genre: str
    published_date: datetime.date
    author: "AuthorType"


@strawberry.django.type(models.Author)
class AuthorType:
    id: int
    first_name: str
    last_name: str
    books: List[BookType]


@strawberry.type
class Query:
    @strawberry.field
    def author(self, id: int) -> AuthorType:
        return models.Author.objects.get(pk=id)

    @strawberry.field
    def authors() -> List[AuthorType]:
        return models.Author.objects.all()

    book: BookType
    books: List[BookType]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_author(self, first_name: str, last_name: str) -> AuthorType:
        author = models.Author(first_name=first_name, last_name=last_name)
        author.save()
        return author

    updateAuthor: AuthorType
    deleteAuthor: AuthorType
    addBook: BookType
    updateBook: BookType
    deleteBook: BookType


schema = strawberry.Schema(query=Query, mutation=Mutation)
