const socketIO = require('socket.io');

// Initialize Socket.IO server
const initSocketIO = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });
};

module.exports = initSocketIO;