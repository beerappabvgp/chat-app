import { WebSocket } from "ws";
import { getSocketsInRoom } from "../services/roomManager";
import { chatMessage } from "../schemas/clientMessage";
import prisma from "../prismaClient";

export const handleChatMessage = async (socket: WebSocket, rawMessage: chatMessage) => {
    const { roomId, message, userId } = rawMessage.payload;
    try {
        const savedMessage = await prisma.message.create({
            data: {
                userId: userId,
                message: message,
                roomId
            }
        });
        console.log("Message saved to database ... ");
    } catch (error) {
        console.log("Error While saving message to the database .... ");
    }
    const sockets = getSocketsInRoom(roomId);
    console.log("userId broadcast: ", userId);
    for (const client of sockets) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    type: "chat",
                    payload: {
                        roomId,
                        message,
                        userId,
                    }
                })
            )
        }
    }
}