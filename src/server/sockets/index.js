const socketIO = require('socket.io');
const clients = {};

module.exports = function(server) {
  const io = socketIO(server);

//   const room = io.of('room');
//   room.emit('');
//   room.clients((error, clients) => {
//   if (error) throw error;
//   console.log('clients!  >>>>>>>>', clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
// });

  io.on('connection', function(socket) {
    console.log('a user connected');

    socket.join('room 237', () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]
    });

    console.log('Connected:', socket.id);
    console.log('socket.handshake.query.token>>', socket.handshake.query.token);
    clients[socket.id] = {
      socket,
      user_name: null
    }

    socket.on('disconnect', function(reason) {
    console.log(`Socket disconnected for: ${reason}`);
    });
  });
};
