'use client';
import React, { useContext, useState } from 'react';
import { Note } from './page';
import Button from '../components/Button';
import { useMutation, useQuery } from '@apollo/client';
import { GlobalContext } from '../context';
import { GET_ALL_NOTES, NEW_NOTE_MUTATION } from '../lib/queries';
import Loader from '../components/Loader';
import { descriptionRegex, titleRegex } from '../common/static';

export default function CreateNote() {
  /**
   * @global states
   */
  const { setIsLoading, modals, setModals, userId } = useContext(GlobalContext);

  /**
   * @queries and @mutations
   */
  const { refetch } = useQuery(GET_ALL_NOTES, {
    skip: true,
  });
  const [createNote, { error, data, loading }] = useMutation(NEW_NOTE_MUTATION);

  /**
   * @states
   */
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

  /**
   * @functions
   */
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
        autoFocus
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value.replace(titleRegex, "") })}
      />
      <textarea
        placeholder="Note Description"
        className="w-full h-40 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        value={newNote.description}
        onChange={(e) => setNewNote({ ...newNote, description: e.target.value.replace(descriptionRegex, "") })}
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="privateNote"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={newNote.hidden}
          onChange={(e) => setNewNote({ ...newNote, hidden: e.target.checked })}
        />
        <label htmlFor="privateNote" className="text-gray-700">Private Note</label>
      </div>
      <Button variant="primary" onClick={handleAddNote} disabled={loading}>
        {loading ? 'Adding...' : 'Add Note'}
      </Button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}
