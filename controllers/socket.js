// io.on('connection', (socket) => {
//   // Bỏ kết nối
//   socket.on('disconnect', () => {});
//   // nhận kết nối từ client
//   socket.on('send-message', (data) => {
//     console.log(data);
//     // gửi data mới gửi lên với các kết nối khác của client
//     socket.emit('servers-send-data', data);
//   });
// });

export const message = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {});
    socket.on('send-message', (room, data) => {
      if (room === '') {
        socket.broadcast.emit('private-message', data);
      } else {
        console.log(room, data);
        socket.in(room).emit('private-message', data);
      }
    });

    socket.on('join-room', (room) => {
      socket.join(room);
    });
  });
};
