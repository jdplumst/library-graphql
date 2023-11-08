export const resolvers = {
    Query: {
        books: async (_, __, context) => {
            console.log("hi");
            return await context.db.book.findMany();
        }
    },
    Book: {
        author: async (parent, args, context) => {
            console.log(parent);
            return context.db.author.findFirst({
                where: { id: Number(parent.author.id) }
            });
        }
    }
};
