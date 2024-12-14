import { WebSocket } from "ws";
import { getSocketsInRoom, getTotalOnline, removeSocketFromRooms } from "../services/roomManager";

export const handleDisconnection = (socket: WebSocket) => {
    const affectedRooms = removeSocketFromRooms(socket);
    for (const roomId of affectedRooms) {
        const usersOnline = getTotalOnline(roomId);
        const sockets = getSocketsInRoom(roomId);
        for (const client of sockets) {
            if (client.readyState === client.OPEN) {
                client.send(
                    JSON.stringify({
                        type: "online",
                        payload: {
                            status: "success",
                            message: usersOnline.toString()
                        }
                    })
                );
            }
        }
    }
    console.log("Socket disconnected and removed from all the rooms..");
}