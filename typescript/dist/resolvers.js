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
        },
        author: async (_, args, context) => {
            return await context.db.author.findFirst({ where: { id: args.id } });
        },
        authors: async (_, __, context) => {
            return await context.db.author.findMany();
        }
    },
    Author: {
        books: async (parent, _, context) => {
            return await context.db.book.findMany({ where: { authorId: parent.id } });
        }
    },
    Book: {
        author: async (parent, _, context) => {
            return await context.db.author.findFirst({
                where: { Book: { some: { id: parent.id } } }
            });
        }
    },
    Mutation: {
        addAuthor: async (_, args, context) => {
            return await context.db.author.create({
                data: { firstName: args.firstName, lastName: args.lastName }
            });
        },
        updateAuthor: async (_, args, context) => {
            return await context.db.author.update({
                data: { firstName: args.firstName, lastName: args.lastName },
                where: { id: args.id }
            });
        },
        deleteAuthor: async (_, args, context) => {
            return await context.db.author.delete({ where: { id: args.id } });
        }
    }
};
