export const resolvers = {
    Query: {
        book: async (_, args, context) => {
            const book = await context.db.book.findFirst({ where: { id: args.id } });
            return {
                ...book,
                publishedDate: book.publishedDate.toLocaleDateString()
            };
        },
        books: async (_, __, context) => {
            const books = await context.db.book.findMany();
            return books.map((b) => ({
                ...b,
                publishedDate: new Date(+b.publishedDate).toLocaleDateString()
            }));
        }
    }
};
