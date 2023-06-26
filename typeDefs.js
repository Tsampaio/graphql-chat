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

  input UserSigninInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(input: UserInput!): User
    signinUser(input: UserSigninInput!): Token
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