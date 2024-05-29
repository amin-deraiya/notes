import { gql } from '@apollo/client';

export const GET_ALL_NOTES = gql`
  query GetAllNotes {
    getAllNotes {
      _id
      title
      description
    }
  }
`;
