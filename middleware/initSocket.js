const socketIO = require('socket.io');

// Initialize Socket.IO server
const initSocketIO = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('con');
    socket.on('chat message', (uId, msg) => {
      io.emit('chat message', uId, msg);
    });
    socket.on('disconnect', () => {
      console.log('discon');
    });
  });
};

module.exports = initSocketIO;