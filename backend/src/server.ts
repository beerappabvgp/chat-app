import { WebSocketServer } from "ws";
import { chatMessageSchema, ClientMessageSchema } from "./schemas/clientMessage";
import { handleJoinRoom } from "./handlers/joinRoomHandler";
import { handleDisconnection } from "./handlers/disconnectHandler";
import { handleChatMessage } from "./handlers/chatMessageHandler";
import express, { Request, Response } from "express";
import http from 'http';
import prisma from "./prismaClient";
import cors from "cors"; // Importing CORS middleware

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(
  cors({
    origin: "https://chat-app-wwov.vercel.app/", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

// Fix for the route handler types
app.get('/', (req: Request, res: Response): Response => {
  return res.status(200).json("Hello from server .... ");
});

// Fix for async route handler
app.get('/messages/:roomId', async (req: Request, res: Response): Promise<Response> => {
  const { roomId } = req.params;
  console.log("server roomId is:", roomId);
  try {
    // Query the database to get all messages for the specific room
    const messages = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      include: {
        room: false,  // Include the room if you want related room data
      },
      orderBy: {
        createdAt: 'asc',  // Sort messages by creation time (ascending)
      },
    });

    // Return the messages as a JSON response
    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      message: "Error fetching messages",
      error: (error as Error).message,
    });
  }
});

wss.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", async (message) => {
    try {
      console.log("message received", message);
      let parsedMessage = JSON.parse(message.toString());
      console.log("parsed-message", parsedMessage);
      if (parsedMessage.type === "join") {
        parsedMessage = ClientMessageSchema.parse(
            JSON.parse(message.toString())
        );
        await handleJoinRoom(socket, parsedMessage);
      } else if (parsedMessage.type === "chat") {
        console.log("entered");
        parsedMessage = chatMessageSchema.parse(
            JSON.parse(message.toString())
        );
        await handleChatMessage(socket, parsedMessage);
      } 
      else {
        console.log("Unhandled message type:", parsedMessage.type);
      }
    } catch (error) {
      console.error("Invalid message:", error);
      socket.send(
        JSON.stringify({
          type: "error",
          payload: { status: "error", message: "Invalid message format" },
        })
      );
    }
  });
  socket.on("close", () => {
    console.log("user disconnected");
    handleDisconnection(socket);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
