import { WebSocket } from "ws";
import { ClientMessage, ClientMessageSchema } from "../schemas/clientMessage";
import prisma from "../prismaClient";
import { sendMessage } from "../utils/sendMessage";
import { addSocketToRoom, getSocketsInRoom, getTotalOnline } from "../services/roomManager";
export const handleJoinRoom = async (socket: WebSocket, message: ClientMessage) => {
    const { roomId, userId } = message.payload;
    addSocketToRoom(roomId, socket);
    const usersOnline = getTotalOnline(roomId);
    const sockets = getSocketsInRoom(roomId);
    console.log("userId broadcast: ", userId);
    for (const client of sockets) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    type: "online",
                    payload: {
                        status: "success",
                        message: usersOnline.toString(), 
                    }
                })
            );
            console.log("server sent the online message to the client");
        }
    }
    try {
        await prisma.room.upsert({
            where: { id: roomId },
            update: {},
            create: { id: roomId },
        });
        console.log(`User ${userId || "unknown"} joined room ${roomId}`);
        // sendMessage(socket, {
        //     type: "ack",
        //     payload: {
        //         status: "success",
        //         message: `Joined room ${roomId}`,
        //     }
        // });
    } catch (error) {
        console.error("Error handling join room:", error);
        // sendMessage(socket, {
        //     type: "error",
        //     payload: {
        //         status: "error",
        //         message: "Failed to join the room"
        //     }
        // });
    }
}