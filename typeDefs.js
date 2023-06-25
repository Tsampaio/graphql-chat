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
    signupUser(input: UserInput!): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;