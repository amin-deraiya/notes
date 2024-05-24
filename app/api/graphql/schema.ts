const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    pin: Int
  }
  
  input NewUserInput {
    name: String!
    email: String!
    password: String!
    pin: Int
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
    createUser(input: NewUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    login(email: String!, pin: Int!): Token!
  }
`;

export default typeDefs;
