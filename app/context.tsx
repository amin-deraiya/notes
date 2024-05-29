'use client';
import React, { createContext, useState } from 'react';
import { GET_ALL_NOTES } from './lib/queries';

export interface GlobalContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  queries: {
    getAllNotes: typeof GET_ALL_NOTES;
  };
}

export const GlobalContext = createContext<GlobalContextState>({
  isLoading: false,
  setIsLoading: () => {},
  queries: {
    getAllNotes: GET_ALL_NOTES,
  },
});

export const GlobalProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queries = { getAllNotes: GET_ALL_NOTES };

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading, queries }}>{children}</GlobalContext.Provider>
  );
};
