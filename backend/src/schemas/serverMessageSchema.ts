import { z } from "zod";

export const ServerMessageSchema = z.object({
    type: z.enum(["ack", "error", "online"]),
    payload: z.object({
        status: z.enum(["success", "error"]),
        message: z.string()
    }),
});

export type ServerMessage = z.infer<typeof ServerMessageSchema>;