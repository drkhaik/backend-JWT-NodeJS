require('dotenv').config();
import { Server } from 'socket.io';
import { TextMessage, FileMessage } from '../models/Message';

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.URL_FRONTEND,
            methods: ['GET', 'POST'],
        },
    });

    io.on("connection", (socket) => {
        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            // console.log(`User with ID, ${socket.id} joined room: ${roomId}`);
        });

        socket.on("send_message", async (data) => {
            const { room, author, body } = data;
            try {
                const newMessage = new TextMessage({
                    conversation: room,
                    body,
                    author: author,
                });
                socket.to(room).emit("receive_message", newMessage);
                await newMessage.save();

            } catch (error) {
                console.error("Error handling conversation", error);
                socket.emit("message_error", "Failed to send message");
                throw error;
            }
        });

        socket.on("send_file", async (data) => {
            const { room, author, body, fileUrl, public_id, fileName, fileType, fileSize } = data;
            try {
                const newMessage = new FileMessage({
                    conversation: room,
                    body,
                    author: author,
                    fileUrl,
                    public_id,
                    fileName,
                    fileType,
                    fileSize
                });
                socket.to(room).emit("receive_file", newMessage);
                await newMessage.save();

            } catch (error) {
                console.error("Error handling conversation", error);
                socket.emit("message_error", "Failed to send message");
                throw error;
            }
        });

    });

    return io;
};
