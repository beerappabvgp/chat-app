"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMessageSchema = void 0;
const zod_1 = require("zod");
exports.ServerMessageSchema = zod_1.z.object({
    type: zod_1.z.enum(["ack", "error", "online"]),
    payload: zod_1.z.object({
        status: zod_1.z.enum(["success", "error"]),
        message: zod_1.z.string()
    }),
});
