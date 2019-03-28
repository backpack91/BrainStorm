const socketIO = require('socket.io');
const clients = {};

module.exports = function(server, roomTitle) {
  const io = socketIO(server);
  const sockets = [];

  io.on('connection', function(socket) {
    console.log('connected: ', socket.id);
    let currentRoom;

    socket.on('disconnect', (reason) => {
      if (reason === 'transport close') {
        sockets.forEach((user, index) => {
          if (user.socket_id === socket.id) {
            socket.broadcast.to(user.room_id).emit('delete disconnected user', user.user_name);
            sockets.splice(index, 1);
          }
        });
        console.log('disconnected: ', socket.id);
      }
    });

    socket.on('room creation', (data) => {
      let currentRoomUsers = [];

      sockets.push(
        {
          room_id: data.room_id,
          socket_id: data.socket_id,
          user_name: data.user_name
        }
      );

      currentRoom = data.room_id;
      socket.join(data.room_id);

      sockets.forEach(user => {
        if (data.room_id === user.room_id) {
          currentRoomUsers.push(user.user_name);
        }
      });

      io.to(data.room_id).emit('update users in room', currentRoomUsers);;
    });

    socket.on('postit creation', (data) => {
      socket.broadcast.to(data.room_id).emit('postit creation', data);
    });

    socket.on('postit deletion', (data) => {
      socket.broadcast.to(data.room_id).emit('postit deletion', data);
    });

    socket.on('update postit value', (data) => {
      socket.to(data.room_id).emit('update postit value', data);
    });

    socket.on('update postit location', (data) => {
      socket.to(data.room_id).emit('update postit location', data);
    });

    socket.on('postit style edit', (data) => {
      socket.to(data.room_id).emit('postit style edit', data);
    });

    socket.on('attach image to postit', (data) => {
      socket.to(data.room_id).emit('attach image to postit', data);
    });
  });
};
