const socketIO = require('socket.io');

// Initialize Socket.IO server
const initSocketIO = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('con');
    // Event when a player joins the room
    socket.on('join', (roomId, playerId, ) => {
      socket.join(roomId); // Join the specified room
      socket.playerId = playerId; // Store the player ID in the socket
      console.log(`${roomId} - ${playerId}`);
      // Notify other players in the room that a new player has joined

      socket.to(roomId).emit('userJoined', playerId);
    });

    // Event when a player makes a move
    socket.on('message', () => {
      // Emit the move event to other players in the room
      console.log(roomId);
      socket.to(roomId).emit('opponentMessage', );
    });

    // Event when a player disconnects
    socket.on('disconnect', () => {
      console.log('discon');
    });
  });
};

module.exports = initSocketIO;