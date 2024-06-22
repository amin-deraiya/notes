import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { GlobalProvider } from './context';
import RootWrapper from './RootWrapper';

const inter = Inter({ subsets: ['latin'] });
const APP_DEFAULT_TITLE = "Notes PWA";
const APP_NAME = "Notes App";
const APP_TITLE_TEMPLATE = "%s - Notes App";
const APP_DESCRIPTION = "Secure Notes App";

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: '/public/favicon.ico',
  },
  manifest: "/public/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

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
