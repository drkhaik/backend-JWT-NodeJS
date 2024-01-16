require('dotenv').config();
import { Server } from 'socket.io';
import Message from '../models/Message';

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
            console.log(`User with ID, ${socket.id} joined room: ${roomId}`);
        });

        socket.on("send_message", async (data) => {
            const { room, author, body, type } = data;
            try {
                const newMessage = new Message({
                    conversation: room,
                    body,
                    type,
                    author: author,
                });
                let messageReceive = {
                    conversation: room,
                    body,
                    type,
                    author: author,
                }
                socket.to(room).emit("receive_message", messageReceive);
                await newMessage.save();

            } catch (error) {
                console.error("Error handling conversation", error);
                socket.emit("message_error", "Failed to send message");
                throw error;
            }
        });

        socket.on("send_file", async (data) => {
            const { room, author, body, type, fileUrl, public_id, fileName, fileType, fileSize } = data;
            try {
                const newMessage = new Message({
                    conversation: room,
                    body,
                    author: author,
                    type,
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
