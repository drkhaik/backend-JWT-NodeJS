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
        console.log(`User Connected, ${socket.id}`);
        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            console.log(`User with ID, ${socket.id} joined room: ${roomId}`);
        });

        socket.on("send_message", async (data) => {
            const { room, author, body } = data;
            try {
                const newMessage = new Message({
                    conversation: room,
                    body,
                    author: author,
                });
                socket.to(room).emit("receive_message", {
                    conversation: room,
                    body,
                    author: author,
                });
                await newMessage.save();

            } catch (error) {
                console.error("Error handling conversation", error);
                socket.emit("message_error", "Failed to send message");
                throw error;
            }
        });

        socket.on("disconnect", (socket) => {
            console.log(`User Disconnected ${socket.id}`)
        });

    });

    return io;
};
