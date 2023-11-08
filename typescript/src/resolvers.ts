import { ContextValue } from ".";
import { QueryAuthorArgs, QueryBookArgs } from "./generated/resolver-types";

export const resolvers = {
  Query: {
    book: async (_, args: QueryBookArgs, context: ContextValue) => {
      const book = await context.db.book.findFirst({ where: { id: args.id } });
      return {
        ...book,
        publishedDate: book.publishedDate.toLocaleDateString()
      };
    },

    books: async (_, __, context: ContextValue) => {
      const books = await context.db.book.findMany();
      return books.map((b) => ({
        ...b,
        publishedDate: new Date(+b.publishedDate).toLocaleDateString()
      }));
    },

    author: async (_, args: QueryAuthorArgs, context: ContextValue) => {
      return context.db.author.findFirst({ where: { id: args.id } });
    },

    authors: async (_, __, context: ContextValue) => {
      return context.db.author.findMany();
    }
  }
};
