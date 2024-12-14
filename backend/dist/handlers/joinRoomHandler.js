"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJoinRoom = void 0;
const ws_1 = require("ws");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const roomManager_1 = require("../services/roomManager");
const handleJoinRoom = (socket, message) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = message.payload;
    (0, roomManager_1.addSocketToRoom)(roomId, socket);
    const usersOnline = (0, roomManager_1.getTotalOnline)(roomId);
    const sockets = (0, roomManager_1.getSocketsInRoom)(roomId);
    console.log("userId broadcast: ", userId);
    for (const client of sockets) {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "online",
                payload: {
                    status: "success",
                    message: usersOnline.toString(),
                }
            }));
            console.log("server sent the online message to the client");
        }
    }
    try {
        yield prismaClient_1.default.room.upsert({
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
    }
    catch (error) {
        console.error("Error handling join room:", error);
        // sendMessage(socket, {
        //     type: "error",
        //     payload: {
        //         status: "error",
        //         message: "Failed to join the room"
        //     }
        // });
    }
});
exports.handleJoinRoom = handleJoinRoom;
