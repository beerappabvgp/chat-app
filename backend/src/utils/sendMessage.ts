import { WebSocket } from "ws";
import { ServerMessage } from "../schemas/serverMessageSchema";

export function sendMessage(socket: WebSocket, message: ServerMessage) {
    socket.send(JSON.stringify(message));
}

