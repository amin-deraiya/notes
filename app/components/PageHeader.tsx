import React, { useContext } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Button from './Button';
import { MdLockOutline } from 'react-icons/md';
import { GlobalContext } from '../context';

const PageHeader: React.FC = () => {
  const { user, isLoading } = useUser();
  const { setModals, modals } = useContext(GlobalContext);

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          <Link href="/">AmiNotes</Link>
        </div>
        <div className="space-x-4 flex items-center" hidden={isLoading}>
          <Button
            variant="outlined-secondary"
            onClick={() => {
              setModals({
                ...modals,
                privateNote: {
                  open: true,
                },
              });
            }}
          >
            <MdLockOutline />
          </Button>
          {user?.name ? (
            <a href="/api/auth/logout">
              <Button variant="secondary">Logout</Button>
            </a>
          ) : (
            <a href="/api/auth/login">
              <Button variant="primary">Login</Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
