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
    author: AuthorType  # = strawberry.field(resolver=get_author)
    authors: List[AuthorType]
    book: BookType
    books: List[BookType]


@strawberry.type
class Mutation:
    addAuthor: AuthorType  # = strawberry.mutation(resolver=add_Author)
    updateAuthor: AuthorType
    deleteAuthor: AuthorType
    addBook: BookType
    updateBook: BookType
    deleteBook: BookType


schema = strawberry.Schema(query=Query, mutation=Mutation)
