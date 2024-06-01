'use client';
import React, { useContext, useState } from 'react';
import { Note } from './page';
import Button from '../components/Button';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GlobalContext } from '../context';
import { GET_ALL_NOTES } from '../lib/queries';
import Loader from '../components/Loader';

const NEW_NOTE_MUTATION = gql`
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

export default function CreateNote() {
  const { setIsLoading, modals, setModals, userId } = useContext(GlobalContext);

  const { refetch } = useQuery(GET_ALL_NOTES, {
    skip: true,
  });
  const [newNote, setNewNote] = useState<Note>({
    description: '',
    _id: '',
    userId: '',
    title: '',
    hidden: false,
    password: '',
    createdAt: '',
    updatedAt: '',
  });
  const [createNote, { error, data, loading }] = useMutation(NEW_NOTE_MUTATION);

  const handleAddNote = async () => {
    setIsLoading(true);

    if (!userId) {
      alert('UserId not found');
      return;
    }

    if (newNote.title.trim() && newNote.description.trim() && userId) {
      await createNote({
        variables: {
          _id: crypto.randomUUID(),
          userId,
          title: newNote.title,
          description: newNote.description,
          hidden: newNote.hidden,
          password: '',
        },
      });
      await refetch({
        userId,
      });
      setIsLoading(false);

      setNewNote({
        description: '',
        _id: '',
        userId: '',
        title: '',
        hidden: false,
        password: '',
        createdAt: '',
        updatedAt: '',
      });
      setModals({
        ...modals,
        createNoteState: {
          open: false,
        },
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Loader />
      <h2 className="text-2xl font-semibold text-gray-800">Add Note</h2>
      <input
        type="text"
        placeholder="Note Title"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Note Description"
        className="w-full h-40 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        value={newNote.description}
        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
      />
      <Button variant="primary" onClick={handleAddNote} disabled={loading}>
        {loading ? 'Adding...' : 'Add Note'}
      </Button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}
