import { ContextValue } from ".";
import { QueryBookArgs } from "./generated/resolver-types";

export const resolvers = {
  Query: {
    books: async (_, __, context: ContextValue) => {
      const books = await context.db.book.findMany();
      return books.map((b) => ({
        ...b,
        publishedDate: new Date(+b.publishedDate).toLocaleDateString()
      }));
    }
  }
};
