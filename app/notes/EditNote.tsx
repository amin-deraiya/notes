'use client';
import React, { useContext, useState } from 'react';
import { Note } from './page';
import Button from '../components/Button';
import { useMutation, useQuery } from '@apollo/client';
import { GlobalContext } from '../context';
import { EDIT_NOTE_MUTATION, GET_ALL_NOTES } from '../lib/queries';
import Loader from '../components/Loader';
import { decode, encode } from '../lib/decodeText';

export default function EditNote({ note }: any) {
  /**
   * @global states
   */
  const { setIsLoading, modals, setModals, userId } = useContext(GlobalContext);

  /**
   * @queris and @mutations
   */
  const { refetch } = useQuery(GET_ALL_NOTES, {
    skip: true,
  });
  const [updateNote, { error, loading }] = useMutation(EDIT_NOTE_MUTATION);

  /**
   * @states
   */
  const [editNote, setEditNote] = useState<Note>(note);

  /**
   * @functions
   */
  const handleEditNote = async () => {
    setIsLoading(true);

    if (!userId) {
      alert('UserId not found');
      return;
    }

    if (editNote.title.trim() && editNote.description.trim() && userId) {
      await updateNote({
        variables: {
          id: editNote._id,
          title: editNote.title,
          description: editNote.description,
          hidden: false,
          password: '',
        },
      });
      await refetch({
        userId,
      });
      setIsLoading(false);

      setModals({
        ...modals,
        editNoteState: {
          open: false,
        },
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Loader />
      <h2 className="text-2xl font-semibold text-gray-800">Edit Note</h2>

      <input
        type="text"
        placeholder="Note Title"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        value={decode(editNote.title)}
        autoFocus
        onChange={(e) => setEditNote({ ...editNote, title: encode(e.target.value) })}
      />
      <textarea
        placeholder="Note Description"
        className="w-full h-40 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        value={decode(editNote.description)}
        onChange={(e) => setEditNote({ ...editNote, description: encode(e.target.value) })}
      />
      {/* <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="privateNote"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={newNote.hidden}
          onChange={(e) => setNewNote({ ...newNote, hidden: e.target.checked })}
        />
        <label htmlFor="privateNote" className="text-gray-700">Private Note</label>
      </div> */}
      <Button variant="primary" onClick={handleEditNote} disabled={loading}>
        {loading ? 'Updating...' : 'Edit Note'}
      </Button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}
