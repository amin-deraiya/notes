'use client';
import React, { useContext, useState } from 'react';
import { Note } from './page';
import Button from '../components/Button';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GlobalContext } from '../context';
import { GET_ALL_NOTES } from '../lib/queries';

const NEW_NOTE_MUTATION = gql`
  mutation createNote(
    $_id: String!
    $title: String!
    $description: String!
    $hidden: Boolean
    $password: String
  ) {
    createNote(_id: $_id, title: $title, description: $description, hidden: $hidden, password: $password) {
      _id
    }
  }
`;

export default function CreateNote() {
  const { setIsLoading } = useContext(GlobalContext);
  const { refetch } = useQuery(GET_ALL_NOTES);
  const [newNote, setNewNote] = useState<Note>({
    description: '',
    _id: '',
    title: '',
    hidden: false,
    password: '',
    createdAt: '',
    updatedAt: '',
  });
  const [createNote, { error, data, loading }] = useMutation(NEW_NOTE_MUTATION, {
    variables: {
      _id: crypto.randomUUID(),
      title: newNote?.title,
      description: newNote?.description,
      hidden: newNote?.hidden,
      password: '',
    },
  });

  const handleAddNote = async () => {
    setIsLoading(true);

    if (newNote?.title.trim() && newNote.description.trim()) {
      const { data } = await createNote();
      refetch();
      setIsLoading(false);

      setNewNote({
        description: '',
        _id: '',
        title: '',
        hidden: false,
        password: '',
        createdAt: '',
        updatedAt: '',
      });
    }
  };

  return (
    <div className="w-[50%] bg-white shadow-md rounded-md p-4 flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Add Note</h2>
      <input
        type="text"
        placeholder="Note Title"
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        value={newNote?.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Note Description"
        className="w-full h-40 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        value={newNote.description}
        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
      />
      <Button variant="primary" onClick={handleAddNote}>
        Add Note
      </Button>
    </div>
  );
}
