'use client';

import { useContext, useEffect, useState, createContext } from "react";

// const WS_URL = "ws://localhost:4000";
const WS_URL = "ws://chat-app-1-7umu.onrender.com/";

type WebSocketContextValue = {
    ws: WebSocket | null;
    isReady: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isReady, SetIsReady] = useState<boolean>(false);
    useEffect(() => {
        const socket = new WebSocket(WS_URL);
        socket.onopen = () => {
            console.log("web socket connected ... "); 
            SetIsReady(true);
        }
        socket.onerror = (error) => {
            console.error("Web scoket error : ", error);
        }
        socket.onclose = () => {
            console.log("socket connection closed");
            SetIsReady(false);
            setWs(null);
        }
        setWs(socket);
        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value = {{ ws, isReady }}>
            { children }
        </WebSocketContext.Provider>
    );
}


export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebsocket must be used within a websocket provider");
    }
    return context;
}
