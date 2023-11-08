import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin"
  },
  {
    title: "City of Glass",
    author: "Paul Auster"
  }
];

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
    books: async () => await db.book.findMany()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 }
});

console.log(`🚀  Server ready at: ${url}`);
