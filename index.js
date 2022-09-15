import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
        books: [ Book ]
        people: [ Person ]
    }
    type Book {
        title: String
        author: String
        bookId: Int
        url: String
        message: String
    }
    type Person {
        name: String
        age: Int
        id: Int
    }
`;

const resolvers = {
    Query: {
        hello: () => "world",
        books: () => {
            return JSON.parse(readFileSync(join(dirname("."), "books.json").toString()));
        },
        people: () => {
            return JSON.parse(readFileSync(join(dirname("."), "people.json").toString()));
        }
    }
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);