import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "./resolvers.js";
import { readFileSync } from "fs";

const typeDefs = readFileSync("src/schema.graphql", { encoding: "utf-8" });

const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });

export interface ContextValue {
  db: PrismaClient;
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ db: db }),
  listen: { port: 5000 }
});

console.log(`🚀  Server ready at: ${url}`);
