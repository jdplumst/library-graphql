import { ContextValue } from ".";
import {
  Author,
  Book,
  MutationAddAuthorArgs,
  MutationAddBookArgs,
  MutationDeleteAuthorArgs,
  MutationDeleteBookArgs,
  MutationUpdateAuthorArgs,
  MutationUpdateBookArgs,
  QueryAuthorArgs,
  QueryBookArgs
} from "./generated/resolver-types";

export const resolvers = {
  Query: {
    book: async (_: any, args: QueryBookArgs, context: ContextValue) => {
      const book = await context.db.book.findFirst({ where: { id: args.id } });
      return {
        ...book,
        publishedDate: book.publishedDate.toLocaleDateString()
      };
    },

    books: async (_: any, __: any, context: ContextValue) => {
      const books = await context.db.book.findMany();
      return books.map((b) => ({
        ...b,
        publishedDate: new Date(+b.publishedDate).toLocaleDateString()
      }));
    },

    author: async (_: any, args: QueryAuthorArgs, context: ContextValue) => {
      return await context.db.author.findFirst({ where: { id: args.id } });
    },

    authors: async (_: any, __: any, context: ContextValue) => {
      return await context.db.author.findMany();
    }
  },

  Author: {
    books: async (parent: Author, _: any, context: ContextValue) => {
      return await context.db.book.findMany({ where: { authorId: parent.id } });
    }
  },

  Book: {
    author: async (parent: Book, _: any, context: ContextValue) => {
      return await context.db.author.findFirst({
        where: { Book: { some: { id: parent.id } } }
      });
    }
  },

  Mutation: {
    addAuthor: async (
      _: any,
      args: MutationAddAuthorArgs,
      context: ContextValue
    ) => {
      return await context.db.author.create({
        data: { firstName: args.firstName, lastName: args.lastName }
      });
    },

    updateAuthor: async (
      _: any,
      args: MutationUpdateAuthorArgs,
      context: ContextValue
    ) => {
      return await context.db.author.update({
        data: { firstName: args.firstName, lastName: args.lastName },
        where: { id: args.id }
      });
    },

    deleteAuthor: async (
      _: any,
      args: MutationDeleteAuthorArgs,
      context: ContextValue
    ) => {
      return await context.db.author.delete({ where: { id: args.id } });
    },

    addBook: async (
      _: any,
      args: MutationAddBookArgs,
      context: ContextValue
    ) => {
      const book = await context.db.book.create({
        data: {
          title: args.title,
          genre: args.genre,
          publishedDate: new Date(args.publishedDate),
          authorId: args.authorId
        }
      });
      return {
        ...book,
        publishedDate: book.publishedDate.toLocaleDateString()
      };
    },

    updateBook: async (
      _: any,
      args: MutationUpdateBookArgs,
      context: ContextValue
    ) => {
      const book = await context.db.book.update({
        data: {
          title: args.title,
          genre: args.genre,
          publishedDate: new Date(args.publishedDate),
          authorId: args.authorId
        },
        where: { id: args.id }
      });
      return {
        ...book,
        publishedDate: book.publishedDate.toLocaleDateString()
      };
    },

    deleteBook: async (
      _: any,
      args: MutationDeleteBookArgs,
      context: ContextValue
    ) => {
      const book = await context.db.book.delete({ where: { id: args.id } });
      return {
        ...book,
        publishedDate: book.publishedDate.toLocaleDateString()
      };
    }
  }
};
