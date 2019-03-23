const socketIO = require('socket.io');
const clients = {};

module.exports = function(server, roomTitle) {
  const io = socketIO(server);

  const sockets = [];

  io.on('connection', function(socket) {
    console.log('connected: ', socket.id);
    let currentRoom;

    socket.on('disconnect', () => {
      sockets.forEach((user, index) => {
        if (user.socket_id === socket.id) {
          socket.broadcast.to(user.room_id).emit('delete disconnected user', user.user_name);
          sockets.splice(index, 1);
        }
      });
      console.log('disconnected: ', socket.id);
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

      console.log('currentRoomUsers: ', currentRoomUsers);
      io.to(data.room_id).emit('update users in room', currentRoomUsers);;
    });

    socket.on('postit creation', (data) => {
      sockets.forEach(item => {
        if(item.socket_id === data.socket_id) {
          socket.broadcast.to(item.room_id).emit('postit creation', data);
        }
      });
    });

    socket.on('postit deletion', (data) => {
      sockets.forEach(item => {
        if(item.socket_id === data.socket_id) {
          socket.broadcast.to(item.room_id).emit('postit deletion', data);
        }
      });
    });

    socket.on('update postit value', (data) => {
      sockets.forEach(item => {
        if(item.socket_id === data.socket_id) {
          socket.to(item.room_id).emit('update postit value', data);
        }
      });
    });

    socket.on('update postit location', (data) => {
      sockets.forEach(item => {
        if(item.socket_id === data.socket_id) {
          socket.to(item.room_id).emit('update postit location', data);
        }
      });
    });
  });
};
