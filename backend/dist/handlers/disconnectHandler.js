"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisconnection = void 0;
const roomManager_1 = require("../services/roomManager");
const handleDisconnection = (socket) => {
    const affectedRooms = (0, roomManager_1.removeSocketFromRooms)(socket);
    for (const roomId of affectedRooms) {
        const usersOnline = (0, roomManager_1.getTotalOnline)(roomId);
        const sockets = (0, roomManager_1.getSocketsInRoom)(roomId);
        for (const client of sockets) {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({
                    type: "online",
                    payload: {
                        status: "success",
                        message: usersOnline.toString()
                    }
                }));
            }
        }
    }
    console.log("Socket disconnected and removed from all the rooms..");
};
exports.handleDisconnection = handleDisconnection;
