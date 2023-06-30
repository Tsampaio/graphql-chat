import { ApolloServer, gql } from "apollo-server";
import jwt from 'jsonwebtoken';
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { authorization } = req.headers;

    if (authorization) {
      const { id } = await jwt.verify(authorization, process.env.JWT_SECRET)
      return { userId: id }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

