const socketIO = require('socket.io');

// Initialize Socket.IO server
const initSocketIO = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('con');
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
      console.log('discon');
    });
  });
};

module.exports = initSocketIO;