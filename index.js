import { ApolloServer, gql } from "apollo-server";
import crypto from "crypto";

const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john@email.com",
    password: "passw45645ord",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@email.com",
    password: "23423423",
  },
];

const todos = [
  {
    title: "Todo 1",
    by: "1",
  },
  {
    title: "Todo 2",
    by: "2",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id:ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(newUser: UserInput!): User
  }


  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    todos: [Todo]
  }

  type Todo {
    title: String!
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }, context) => {
      console.log(id);
      return users.find((user) => user.id === id);
    }
  },
  User: {
    todos: (parent, args, context) => {
      return todos.filter((todo) => todo.by === parent.id);
    },
  },
  Mutation: {
    createUser: (parent, { newUser }, context) => {
      const user = {
        id: crypto.randomUUID(),
        ...newUser,
      };
      users.push(user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

