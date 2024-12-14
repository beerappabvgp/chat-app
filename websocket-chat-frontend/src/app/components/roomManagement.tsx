'use client';

import { useEffect } from "react";
import { ClientMessageSchema } from "../types";
import { useWebSocket } from "../WebSocketProvider";
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { useUsername } from "../UserNameContext";

export const JoinRoom = ({ roomId }: { roomId: string }) => {
  const { ws } = useWebSocket();
  const router = useRouter(); // Initialize router
  const { username } = useUsername();
  useEffect(() => {
    // If WebSocket is available, send the join request when the component loads
    if (ws) {
      // Preparing the message to send
      const message = ClientMessageSchema.parse({
        type: "join",
        payload: {
          roomId: roomId,
          userId: username,
        },
      });
      // Send the WebSocket message to join the room
      ws.send(JSON.stringify(message));
      router.push(`/room/${roomId}`);
      // Listen for the server's response
      // ws.onmessage = (event) => {
      //   const serverMessage = JSON.parse(event.data);

      //   if (serverMessage.type === "ack") {
      //     // Show acknowledgment message and redirect to the room page
      //     setAckMessage(serverMessage.payload.message);
      //     router.push(`/room/${roomId}`); // Redirect user to the room page

      //   } else if (serverMessage.type === "error") {
      //     // Show error message if something goes wrong
      //     setAckMessage(serverMessage.payload.message);
      //   }
      // };
    } else {
      console.error("WebSocket is not connected ...");
    }
  }, [ws, roomId, router, username]); // Dependencies: Re-run the effect if `ws` or `roomId` changes

  // The UI will show only the acknowledgment message or a loading state if needed
  return (
    <div className="text-center">
      {/* {ackMessage ? (
        <div className="mt-4 p-4 bg-green-500 rounded-lg text-white">
          {ackMessage}
        </div>
      ) : (
        <div className="mt-4 p-4 bg-blue-600 rounded-lg text-white">
          Joining the room, please wait...
        </div>
      )} */}
    </div>
  );
};
