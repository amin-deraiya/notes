import { gql } from '@apollo/client';

export const GET_ALL_NOTES = gql`
  query GetAllNotes($userId: String!) {
    getAllNotes(userId: $userId) {
      _id
      title
      description
      updatedAt
      createdAt
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      _id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $email_verified: Boolean, $name: String!) {
    createUser(email: $email, email_verified: $email_verified, name: $name) {
      _id
    }
  }
`;

export const NEW_NOTE_MUTATION = gql`
  mutation createNote(
    $_id: String!
    $title: String!
    $description: String!
    $hidden: Boolean
    $password: String
    $userId: String!
  ) {
    createNote(
      _id: $_id
      userId: $userId
      title: $title
      description: $description
      hidden: $hidden
      password: $password
    ) {
      _id
    }
  }
`;

export const EDIT_NOTE_MUTATION = gql`
  mutation UpdateNote(
    $id: String!
    $title: String!
    $description: String!
    $hidden: Boolean!
    $password: String!
  ) {
    updateNote(_id: $id, title: $title, description: $description, hidden: $hidden, password: $password) {
      _id
    }
  }
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($_id: String!) {
    deleteNote(_id: $_id) {
      acknowledged
      deletedCount
    }
  }
`;
