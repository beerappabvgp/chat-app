'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type UsernameContextType = {
  username: string | null;
  setUsername: (username: string) => void;
};

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = (): UsernameContextType => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useUsername must be used within a UsernameProvider');
  }
  return context;
};
