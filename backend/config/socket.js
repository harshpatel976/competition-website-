const { Server } = require('socket.io');
const { SOCKET_PORT } = require('./env');

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Update with frontend URL in production
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = initSocket;