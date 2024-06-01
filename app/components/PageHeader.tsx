import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const PageHeader: React.FC = () => {
  const { user, isLoading } = useUser();

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          <Link href="/">AmiNotes</Link>
        </div>
        <div className="space-x-4" hidden={isLoading}>
          {user?.name ? (
            <a
              href="/api/auth/logout"
              className="bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700"
            >
              Logout
            </a>
          ) : (
            <a
              href="/api/auth/login"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
