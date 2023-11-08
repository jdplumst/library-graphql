import { ContextValue } from ".";

export const resolvers = {
  Query: {
    books: async (_, __, context: ContextValue) => {
      return await context.db.book.findMany();
    }
  }
};
