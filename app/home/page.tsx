'use client';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';

const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
    }
  }
`;

export const Home = () => {
  // const { loading, error, data } = useQuery(GET_USERS, { client });
  const { loading, error, data } = useQuery(GET_USERS, { client });
  console.log({ loading }, { error }, { data });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
