'use client';
import React, { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from './components/Button';
import Modal from './Modals';
import CreateNote from './notes/CreateNote';
import { GlobalContext } from './context';
import { useUser } from '@auth0/nextjs-auth0/client';

const Home: React.FC = () => {
  const { modals, setModals } = useContext(GlobalContext);
  const { user, isLoading } = useUser();

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Notes App</h1>
        <p className="text-gray-700 mb-6">
          A simple and secure way to keep track of your notes. You can create, view, and manage all your notes
          in one place.
        </p>
        {user?.email && !isLoading ? (
          <div className="space-y-4">
            <Link href="/notes">
              <Button variant="primary" className="mx-1">
                Go to Notes
              </Button>
            </Link>

            <Button variant="primary" className="mx-1" onClick={handleOpenModal}>
              Create a New Note
            </Button>
          </div>
        ) : (
          <a
            href="/api/auth/login"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
          >
            Login
          </a>
        )}
      </div>
      <Modal isOpen={modals.createNoteState.open} onClose={handleCloseModal}>
        <CreateNote />
      </Modal>
    </div>
  );
};

export default Home;
