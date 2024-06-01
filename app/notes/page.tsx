'use client';
import React, { useContext, useEffect, useState } from 'react';
import withAuth from '../components/hooks/withAuth';
import { useQuery } from '@apollo/client';
import CreateNote from './CreateNote';
import { GET_ALL_NOTES } from '../lib/queries';
import Modal from '../Modals';
import { GlobalContext } from '../context';
import { decode } from '../lib/decodeText';

export interface Note {
  _id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  hidden: boolean;
}

const Notes: React.FC = () => {
  const { modals, setModals, userId } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    loading,
    data,
    refetch: getAllNotes,
  } = useQuery(GET_ALL_NOTES, {
    skip: !userId,
    variables: { userId },
  });

  let notes = data?.getAllNotes ? JSON.parse(JSON.stringify(data?.getAllNotes)) : [];
  notes = notes?.sort((a: any, b: any) => {
    // Convert updatedAt strings to numbers (assuming timestamps)
    const updatedAtA = parseInt(a.updatedAt, 10);
    const updatedAtB = parseInt(b.updatedAt, 10);

    // Descending order: latest update first
    return updatedAtB - updatedAtA;
  });

  useEffect(() => {
    if (userId) {
      getAllNotes({
        userId,
      });
    }
  }, [userId]);

  const handleOpenModal = () => {
    setModals({
      ...modals,
      createNoteState: {
        open: true,
      },
    });
  };

  const handleCloseModal = () => {
    setModals({
      ...modals,
      createNoteState: {
        open: false,
      },
    });
  };

  const filteredNotes = notes?.filter(
    (note: Note) =>
      decode(note.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      decode(note.description).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 relative">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full px-3 py-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-center">Fetching Notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes found! Try a different search.</p>
        ) : (
          <ul className="space-y-4">
            {filteredNotes.map((note: Note) => (
              <li key={note._id} className="bg-gray-50 shadow-sm rounded-md p-4">
                <h3 className="text-xl font-semibold text-gray-800">{decode(note.title)}</h3>
                <p className="text-gray-700 mt-2">{decode(note.description)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
        onClick={handleOpenModal}
      >
        +
      </button>

      <Modal isOpen={modals.createNoteState.open} onClose={handleCloseModal}>
        <CreateNote />
      </Modal>
    </div>
  );
};

export default withAuth(Notes);
