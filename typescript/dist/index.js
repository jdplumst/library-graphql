import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./schema.js";
const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const resolvers = {
    Query: {
        books: async (_, __, context) => {
            return await context.db.book.findMany();
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ db: db }),
    listen: { port: 5000 }
});
console.log(`🚀  Server ready at: ${url}`);
