'use client';
import React, { createContext, useEffect, useState } from 'react';
import { GET_ALL_NOTES, GET_USER_BY_EMAIL } from './lib/queries';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@apollo/client';

export interface GlobalContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModals: React.Dispatch<React.SetStateAction<any>>;
  modals: {
    createNoteState: {
      open: boolean;
    };
  };
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextState>({
  isLoading: false,
  setIsLoading: () => {},
  setModals: () => {},
  modals: {
    createNoteState: {
      open: false,
    },
  },
  userId: '',
  setUserId: () => {},
});

export const GlobalProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modals, setModals] = useState({
    createNoteState: {
      open: false,
    },
  });
  const [userId, setUserId] = useState('');

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading, modals, setModals, userId, setUserId }}>
      {children}
    </GlobalContext.Provider>
  );
};
