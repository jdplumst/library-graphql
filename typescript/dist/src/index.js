import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
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
    title: String
    author: String
  }
  
  type Query {
    books: [Book]
  }
`;
const resolvers = {
    Query: {
        books: () => books
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        return {
            dataSources: {
                db
            }
        };
    },
    listen: { port: 5000 }
});
console.log(`🚀  Server ready at: ${url}`);
