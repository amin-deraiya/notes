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

  type Query {
    users: [User]
    user(id: ID!): User
    getUserByName(name: String!): User
    getUserByEmail(email: String!): User
    getAllNotes(userId: String!): [Notes]
  }

  type DeleteNoteResponse {
    acknowledged: Boolean
    deletedCount: String
  }

  type Mutation {
    createUser(email: String!, name: String!, email_verified: Boolean): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
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
    updateNote(
      _id: String!
      title: String!
      description: String!
      hidden: Boolean!
      password: String!
      createdAt: String
      updatedAt: String
      userId: String
    ): Notes
    deleteNote(_id: String!): DeleteNoteResponse
  }
`;

export default typeDefs;
