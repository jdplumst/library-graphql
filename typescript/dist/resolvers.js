export const resolvers = {
    Query: {
        books: async (_, __, context) => {
            return await context.db.book.findMany();
        }
    },
    Book: {
        author: async (parent, args, context) => {
            return;
        }
    }
};
