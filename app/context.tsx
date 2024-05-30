'use client';
import React, { createContext, useState } from 'react';
import { GET_ALL_NOTES } from './lib/queries';

export interface GlobalContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModals: React.Dispatch<React.SetStateAction<any>>;
  queries: {
    getAllNotes: typeof GET_ALL_NOTES;
  };
  modals: {
    createNoteState: {
      open: boolean;
    };
  };
}

export const GlobalContext = createContext<GlobalContextState>({
  isLoading: false,
  setIsLoading: () => {},
  setModals: () => {},
  queries: {
    getAllNotes: GET_ALL_NOTES,
  },
  modals: {
    createNoteState: {
      open: false,
    },
  },
});

export const GlobalProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queries = { getAllNotes: GET_ALL_NOTES };
  const [modals, setModals] = useState({
    createNoteState: {
      open: false,
    },
  });

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading, queries, modals, setModals }}>
      {children}
    </GlobalContext.Provider>
  );
};
