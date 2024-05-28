'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Button from './components/Button';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 py-4 px-4 sm:px-6 lg:px-8 rounded-md">
        <div className="w-full max-w-lg space-y-6">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Notes App</h1>
            <nav>
              {user ? (
                <>
                  <a href="/api/auth/logout">
                    <Button variant="primary" className="mr-1">
                      Logout
                    </Button>
                  </a>
                  <Link href={"/notes"}>
                    <Button variant="primary">Create Note</Button>
                  </Link>
                </>
              ) : (
                <a href="/api/auth/login">
                  <Button variant="primary">Login</Button>
                </a>
              )}
            </nav>
          </header>

          <div className="text-lg text-gray-700">
            <h2>Welcome to the Notes App!</h2>
            <p>
              This is a beautifully designed and easy-to-use application that helps you take notes, organize
              your thoughts, and stay productive.
            </p>
            <p>Here are some of the key features you will enjoy:</p>
            <ul className="list-disc space-y-2">
              <li>Create and manage notes with rich text formatting.</li>
              <li>Organize your notes into categories or tags for easy access.</li>
              <li>Search for specific notes using keywords.</li>
              <li>Collaborate on notes with friends or colleagues (if supported).</li>
              <li>Access your notes from any device with an internet connection (if supported).</li>
            </ul>
            {!user && (
              <p>
                Get started by creating an account or logging in (if you have not already) using the button
                above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
