'use client';
import React from 'react';
import withAuth from '../components/hooks/withAuth';
import { gql, useQuery } from '@apollo/client';
import CreateNote from './CreateNote';

export interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  hidden: boolean;
}

const GET_ALL_NOTES = gql`
  query GetAllNotes {
    getAllNotes {
      _id
      title
      description
    }
  }
`;

const Notes: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_NOTES);
  const notes = data?.getAllNotes || [];

  if (loading) {
    <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-wrap">
      {/* Note form on the left */}
      <CreateNote />

      {/* Note list on the right */}
      <div className="w-[50%] px-4 py-4">
        {notes?.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet! Add some notes to see them here.</p>
        ) : (
          <ul className="space-y-4">
            {notes?.map((note: Note) => (
              <li key={note?._id} className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
                <p className="text-gray-700">{note.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default withAuth(Notes);
