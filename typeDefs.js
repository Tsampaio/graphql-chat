import { gql } from 'apollo-server-express';

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

  }


  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Todo {
    title: String!
    by: ID!
  }
`;

export default typeDefs;