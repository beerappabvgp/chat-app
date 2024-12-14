import { WebSocket } from "ws";

type RoomMap = Record<string, Set<WebSocket>>;
type SocketToRoomsMap = Map<WebSocket, Set<string>>;


const rooms: RoomMap = {};
const socketToRooms: SocketToRoomsMap = new Map();

// export const addSocketToRoom = (roomId: string, socket: WebSocket) => {
//     if (!rooms[roomId]) {
//         rooms[roomId] = new Set();
//     }
//     rooms[roomId].add(socket);
// }

export const addSocketToRoom = (roomId: string, socket: WebSocket) => {
    if (!rooms[roomId]) rooms[roomId] = new Set();
    rooms[roomId].add(socket);
  
    if (!socketToRooms.has(socket)) socketToRooms.set(socket, new Set());
    socketToRooms.get(socket)?.add(roomId);
  };

export const removeSocketFromRooms = (socket: WebSocket) => {
    const roomsToRemove = socketToRooms.get(socket) || new Set();
    const affectedRooms: string[] = [];
    for (const roomId of roomsToRemove) {
        rooms[roomId]?.delete(socket);
        if(rooms[roomId]?.size === 0) delete rooms[roomId];
        affectedRooms.push(roomId);
    }
    socketToRooms.delete(socket);
    return affectedRooms;
}

export const getSocketsInRoom = (roomId: string) => {
    return rooms[roomId] || new Set();
}


export const getTotalOnline = (roomId: string) => {
    const sockets = rooms[roomId];
    return sockets ? sockets.size : 0;
};