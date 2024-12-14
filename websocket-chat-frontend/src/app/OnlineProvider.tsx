'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useWebSocket } from './WebSocketProvider';

// Define the type for the context state
type OnlineContextType = {
  count: number; // Represents the online user count
  setCount: (count: number) => void; // Function to update the count
};

// Create the context with an initial value of undefined
const OnlineContext = createContext<OnlineContextType | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);
  const { ws, isReady } = useWebSocket();
  useEffect(() => {
    if (!ws || !isReady) {
        console.log("web socket connection is not extablished from online count provider");        
        return;
      }
    const handleOnlineMessage = (event: MessageEvent) => {
        try {
            const message = JSON.parse(event.data);
            console.log("message online from server ..", message);
            if(message.type === "online") {
                const onlineCount = parseInt(message.payload.message, 10);
                setCount(onlineCount);
            }
        } catch (error) {
            console.error("error while processing the online count message from the server...", error);
        }
    };
    ws.addEventListener('message', handleOnlineMessage);
    return () => {
        ws.removeEventListener('message', handleOnlineMessage);
    }
  }, [ws, isReady]);
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
