"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
function sendMessage(socket, message) {
    socket.send(JSON.stringify(message));
}
