import { gql } from '@apollo/client';

export const GET_ALL_NOTES = gql`
  query GetAllNotes($userId: String!) {
    getAllNotes(userId: $userId) {
      _id
      title
      description
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
