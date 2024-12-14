    import { z } from "zod";

    export const ClientMessageSchema = z.object({
        type: z.enum(["join", "chat"]),
        payload: z.object({
            roomId: z.string().min(1, "Room Id is required"),
            userId: z.string().optional(),
        }),
    });

    export const chatMessageSchema = z.object({
        type: z.enum(["chat"]),
        payload: z.object({
            roomId: z.string(),
            userId: z.string().optional(),
            message: z.string(),
        }),
    });

    export type chatMessage = z.infer<typeof chatMessageSchema>;

    export type ClientMessage = z.infer<typeof ClientMessageSchema>;