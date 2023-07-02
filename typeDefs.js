import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User]
    messagesByUser(receiverId: String!): [Message]
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

  scalar Date

  type Message {
    id: ID!
    text:  String!
    receiverId:  String!
    senderId:  String!
    createdAt: String!
    updatedAt: Date!
  }

  type Mutation {
    signupUser(input: UserInput!): User
    signinUser(input: UserSigninInput!): Token
    createMessage(receiverId: String!, text: String!): Message
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