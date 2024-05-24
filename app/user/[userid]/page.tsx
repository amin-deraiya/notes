'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
// import client from './../../lib/apolloClient';

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      _id
      name
      email
    }
  }
`;

export default function User() {
  const params = useParams<{ userid: string }>();
  const  id  = params.userid;
  const { loading, error, data } = useQuery(GET_USER_BY_ID, { variables: { id } });
  console.log({ loading }, { error }, { data });

  if (loading) {
    return <>Loading...</>
  }
  if (error) {
    return error.message
  }

  return <div>{data.user.name}</div>;
}
