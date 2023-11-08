import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    genre: String!
    publishedDate: String!
    author: String!
  }
  
  type Query {
    books: [Book!]
  }
`;
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
    context: async ({ req }) => ({
        db: new PrismaClient({ log: ["query", "info", "warn", "error"] })
    }),
    listen: { port: 5000 }
});
console.log(`🚀  Server ready at: ${url}`);
