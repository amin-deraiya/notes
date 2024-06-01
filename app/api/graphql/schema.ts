const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    email_verified: Boolean
  }

  type Notes {
    _id: ID!
    title: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    password: String
    hidden: Boolean!
    userId: String!
  }

  input NewUserInput {
    email: String!
    name: String!
    email_verified: Boolean
  }

  input NewNoteInput {
    _id: ID!
    title: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    password: String
    hidden: Boolean!
    userId: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String
  }

  input LoginUserInput {
    id: ID!
    pin: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
    getUserByName(name: String!): User
    getUserByEmail(email: String!): User
    getAllNotes(userId: String!): [Notes]
  }

  type LoginRes {
    _id: ID
    name: String
    email: String
    token: String
  }

  type Token {
    token: String
    _id: ID
    name: String
    email: String
    status: String
    msg: String
  }

  type Mutation {
    createUser(email: String!, name: String!, email_verified: Boolean): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    login(email: String!, pin: Int!): Token!
    createNote(
      _id: String!
      title: String!
      description: String!
      hidden: Boolean
      password: String
      createdAt: String
      updatedAt: String
      userId: String!
    ): Notes
  }
`;

export default typeDefs;
