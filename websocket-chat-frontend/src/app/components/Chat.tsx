'use client';

import { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { chatMessage, chatMessageSchema } from "../types";
import { useUsername } from "../UserNameContext";
import { useOnlineCount } from "../OnlineProvider";

export const Chat = ({ roomId }: { roomId: string }) => {
  const { ws } = useWebSocket();
  const [message, setMessage] = useState<string>(""); 
  const [receivedMessages, setReceivedMessages] = useState<chatMessage[]>([]);
  const { username } = useUsername();
  const { count } = useOnlineCount();


  const handleSendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const chatMessage: chatMessage = {
        type: "chat",
        payload: {
          roomId,
          message,
          userId: username as string,
        },
      };
      ws.send(JSON.stringify(chatMessage));
      setReceivedMessages((prevMessage) => [...prevMessage, chatMessage]);
      setMessage("");
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => alert('Room ID copied to clipboard!'))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(err => alert('Failed to copy Room ID.'));
  };

  useEffect(() => {
    if (!ws) return;
    const fetchPreviousMessages = async () => {
      try {
        const response = await fetch(`https://chat-app-1-7umu.onrender.com/messages/${roomId}`);
        if (response.ok) {
          const data = await response.json();
          const transformedMessages = data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((message: any) => {
              try {
                return {
                  type: "chat",
                  payload: {
                    roomId: message.roomId,
                    message: message.message,
                    userId: message.userId,
                  },
                };
              } catch {
                return null;
              }
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((msg: any) => msg !== null);
  
          setReceivedMessages(transformedMessages);
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    };
    fetchPreviousMessages();

    const handleMessage = (event: MessageEvent) => {
      try {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage.type === 'chat') {
          const parsedMessage = chatMessageSchema.parse(receivedMessage);
          if (parsedMessage.payload.roomId === roomId) {
            setReceivedMessages((prevMessages) => [...prevMessages, parsedMessage]);
          }
        }
      } catch {}
    };

    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, roomId]);

  return (
    <div className="p-8 bg-black min-h-screen text-gray-200 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Chat Room</h1>
          <div className="text-xl font-semibold text-gray-300">
            Online Users: <span className="font-bold text-white">{count}</span>
          </div>
        </div>

        {/* Room Info and Invite Section */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg text-center border border-gray-700 shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Room ID</h2>
            <p className="text-lg text-green-400 mt-1">{roomId}</p>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={copyRoomId}
              className="text-sm text-gray-200 bg-teal-500 hover:bg-teal-400 rounded-sm p-2 mb-2 transition ease-in-out duration-150"
            >
              <span className="">copy</span>
            </button>
            
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
          {receivedMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg shadow-md ${
                msg.payload.userId === username
                  ? "bg-teal-600 text-gray-900 text-right"
                  : "bg-indigo-500 text-white text-left"
              }`}
            >
              <div>
                {/* Username */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-bold text-xl ${
                      msg.payload.userId === username ? "text-teal-300" : "text-indigo-300"
                    }`}
                  >
                    {msg.payload.userId || "Unknown User"}
                  </span>
                  <span className="text-sm text-gray-400 italic">
                    {msg.payload.userId === username ? "You" : "User"}
                  </span>
                </div>

                {/* Separator */}
                <div className="border-b border-gray-700 mb-2"></div>

                {/* Message */}
                <span className="block text-xl text-white leading-relaxed">
                  {msg.payload.message}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex mt-6 space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 text-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-teal-500 text-gray-900 rounded-lg hover:bg-teal-400 text-lg font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
