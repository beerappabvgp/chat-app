"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageSchema = exports.ClientMessageSchema = void 0;
const zod_1 = require("zod");
exports.ClientMessageSchema = zod_1.z.object({
    type: zod_1.z.enum(["join", "chat"]),
    payload: zod_1.z.object({
        roomId: zod_1.z.string().min(1, "Room Id is required"),
        userId: zod_1.z.string().optional(),
    }),
});
exports.chatMessageSchema = zod_1.z.object({
    type: zod_1.z.enum(["chat"]),
    payload: zod_1.z.object({
        roomId: zod_1.z.string(),
        userId: zod_1.z.string().optional(),
        message: zod_1.z.string(),
    }),
});
