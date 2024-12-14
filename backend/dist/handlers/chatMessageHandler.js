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
exports.handleChatMessage = void 0;
const ws_1 = require("ws");
const roomManager_1 = require("../services/roomManager");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const handleChatMessage = (socket, rawMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, message, userId } = rawMessage.payload;
    try {
        const savedMessage = yield prismaClient_1.default.message.create({
            data: {
                userId: userId,
                message: message,
                roomId
            }
        });
        console.log("Message saved to database ... ");
    }
    catch (error) {
        console.log("Error While saving message to the database .... ");
    }
    const sockets = (0, roomManager_1.getSocketsInRoom)(roomId);
    console.log("userId broadcast: ", userId);
    for (const client of sockets) {
        if (client !== socket && client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId,
                    message,
                    userId,
                }
            }));
        }
    }
});
exports.handleChatMessage = handleChatMessage;
