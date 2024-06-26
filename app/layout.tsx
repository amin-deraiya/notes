import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { GlobalProvider } from './context';
import RootWrapper from './RootWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes',
  description: 'secure notes app',
  icons: {
    icon: '/public/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <UserProvider>
        <GlobalProvider>
          <body className={inter.className}>
            <link rel="icon" href="/public/favicon.ico" sizes="any" />
            <ApolloWrapper>
              <RootWrapper>{children}</RootWrapper>
            </ApolloWrapper>
          </body>
        </GlobalProvider>
      </UserProvider>
    </html>
  );
}
