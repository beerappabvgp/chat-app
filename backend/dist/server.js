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
const ws_1 = require("ws");
const clientMessage_1 = require("./schemas/clientMessage");
const joinRoomHandler_1 = require("./handlers/joinRoomHandler");
const disconnectHandler_1 = require("./handlers/disconnectHandler");
const chatMessageHandler_1 = require("./handlers/chatMessageHandler");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const prismaClient_1 = __importDefault(require("./prismaClient"));
const cors_1 = __importDefault(require("cors")); // Importing CORS middleware
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
}));
// Fix for the route handler types
app.get('/', (req, res) => {
    return res.status(200).json("Hello from server .... ");
});
// Fix for async route handler
app.get('/messages/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    console.log("server roomId is:", roomId);
    try {
        // Query the database to get all messages for the specific room
        const messages = yield prismaClient_1.default.message.findMany({
            where: {
                roomId: roomId,
            },
            include: {
                room: false, // Include the room if you want related room data
            },
            orderBy: {
                createdAt: 'asc', // Sort messages by creation time (ascending)
            },
        });
        // Return the messages as a JSON response
        return res.json(messages);
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({
            message: "Error fetching messages",
            error: error.message,
        });
    }
}));
wss.on("connection", (socket) => {
    console.log("user connected");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("message received", message);
            let parsedMessage = JSON.parse(message.toString());
            console.log("parsed-message", parsedMessage);
            if (parsedMessage.type === "join") {
                parsedMessage = clientMessage_1.ClientMessageSchema.parse(JSON.parse(message.toString()));
                yield (0, joinRoomHandler_1.handleJoinRoom)(socket, parsedMessage);
            }
            else if (parsedMessage.type === "chat") {
                console.log("entered");
                parsedMessage = clientMessage_1.chatMessageSchema.parse(JSON.parse(message.toString()));
                yield (0, chatMessageHandler_1.handleChatMessage)(socket, parsedMessage);
            }
            else {
                console.log("Unhandled message type:", parsedMessage.type);
            }
        }
        catch (error) {
            console.error("Invalid message:", error);
            socket.send(JSON.stringify({
                type: "error",
                payload: { status: "error", message: "Invalid message format" },
            }));
        }
    }));
    socket.on("close", () => {
        console.log("user disconnected");
        (0, disconnectHandler_1.handleDisconnection)(socket);
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});
