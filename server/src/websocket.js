// server/src/websocket.js - Handles real-time communication using Socket.IO.

const { Server } = require('socket.io');

let io;

exports.initWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:8080", // Must match client's host
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('update_task_status', (data) => {
            console.log(`Task ${data.taskId} moved to ${data.newStatus}`);
            // Broadcast the update to all other connected clients
            socket.broadcast.emit('task_status_changed', { 
                taskId: data.taskId, 
                newStatus: data.newStatus 
            });
            // You would also call taskService.updateTaskStatus here.
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

exports.getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};