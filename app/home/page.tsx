'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  const { user, isLoading, error } = useUser();

  // Handle loading and error states (optional)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Notes App</h1>
          <nav>
            {user ? (
              // <Link href="/api/auth/logout">
                <a className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/api/auth/logout">
                  Logout
                </a>
              // </Link>
            ) : (
              // <Link href="/api/auth/login">
                <a className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/api/auth/login">
                  Login
                </a>
              // </Link>
            )}
          </nav>
        </header>

        <div className="text-lg text-gray-700">
          <h2>Welcome to the Notes App!</h2>
          <p>
            This is a beautifully designed and easy-to-use application that helps you take notes, organize your thoughts, and stay productive.
          </p>
          <p>
            Here are some of the key features you will enjoy:
          </p>
          <ul className="list-disc space-y-2">
            <li>Create and manage notes with rich text formatting.</li>
            <li>Organize your notes into categories or tags for easy access.</li>
            <li>Search for specific notes using keywords.</li>
            <li>Collaborate on notes with friends or colleagues (if supported).</li>
            <li>Access your notes from any device with an internet connection (if supported).</li>
          </ul>
          <p>
            Get started by creating an account or logging in (if you have not already) using the button above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
