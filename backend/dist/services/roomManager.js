"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOnline = exports.getSocketsInRoom = exports.removeSocketFromRooms = exports.addSocketToRoom = void 0;
const rooms = {};
const socketToRooms = new Map();
// export const addSocketToRoom = (roomId: string, socket: WebSocket) => {
//     if (!rooms[roomId]) {
//         rooms[roomId] = new Set();
//     }
//     rooms[roomId].add(socket);
// }
const addSocketToRoom = (roomId, socket) => {
    var _a;
    if (!rooms[roomId])
        rooms[roomId] = new Set();
    rooms[roomId].add(socket);
    if (!socketToRooms.has(socket))
        socketToRooms.set(socket, new Set());
    (_a = socketToRooms.get(socket)) === null || _a === void 0 ? void 0 : _a.add(roomId);
};
exports.addSocketToRoom = addSocketToRoom;
const removeSocketFromRooms = (socket) => {
    var _a, _b;
    const roomsToRemove = socketToRooms.get(socket) || new Set();
    const affectedRooms = [];
    for (const roomId of roomsToRemove) {
        (_a = rooms[roomId]) === null || _a === void 0 ? void 0 : _a.delete(socket);
        if (((_b = rooms[roomId]) === null || _b === void 0 ? void 0 : _b.size) === 0)
            delete rooms[roomId];
        affectedRooms.push(roomId);
    }
    socketToRooms.delete(socket);
    return affectedRooms;
};
exports.removeSocketFromRooms = removeSocketFromRooms;
const getSocketsInRoom = (roomId) => {
    return rooms[roomId] || new Set();
};
exports.getSocketsInRoom = getSocketsInRoom;
const getTotalOnline = (roomId) => {
    const sockets = rooms[roomId];
    return sockets ? sockets.size : 0;
};
exports.getTotalOnline = getTotalOnline;
