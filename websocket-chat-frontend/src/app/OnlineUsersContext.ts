'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context state
type OnlineContextType = {
  count: number; // Represents the online user count
  setCount: (count: number) => void; // Function to update the count
};

// Create the context with an initial value of undefined
const OnlineContext = createContext<OnlineContextType | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  return (
    <OnlineContext.Provider value={{ count, setCount }}>
      {children}
    </OnlineContext.Provider>
  );
};

// Custom hook to access the context
export const useOnlineCount = (): OnlineContextType => {
  const context = useContext(OnlineContext);
  if (!context) {
    throw new Error('useOnlineCount must be used within an OnlineProvider');
  }
  return context;
};
