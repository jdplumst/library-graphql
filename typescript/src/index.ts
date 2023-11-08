import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });

interface ContextValue {
  db: PrismaClient;
}

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
    books: async (_, __, context: ContextValue) => {
      return await context.db.book.findMany();
    }
  }
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ db: db }),
  listen: { port: 5000 }
});

console.log(`🚀  Server ready at: ${url}`);