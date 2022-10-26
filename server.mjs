import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// Schemas
const typeDefs = `#graphql
  type Query {
    characters:[Character!]!
  }

  type Character {
    id: Int,
    name: String,
    marriage: Boolean,
    topGifts: [String],
    address: String,
    birthday: String
  }
`;

//Resolvers
const resolvers = {
  Query: {
    
  },
};

const app = express();
const httpServer = http.createServer(app);

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`Server ready at http://localhost:4000`);