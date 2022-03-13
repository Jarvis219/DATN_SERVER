import {
  createNotificationStaff,
  listNotificationStaff,
  removeNotificationStaff,
} from '../controllers/notificationStaffController';

export const notification = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {});
    socket.on('notifications-staff', (room, id) => {
      if (room === 'notifications-staff') {
        createNotificationStaff(id).then((data) => {
          listNotificationStaff(data.staff_id).then((noti) => {
            socket.broadcast.emit('send-notification', noti);
          });
        });
      }
    });

    socket.on('remove-notification', (id) => {
      removeNotificationStaff(id).then((data) => {
        listNotificationStaff(data.staff_id).then((noti) => {
          socket.broadcast.emit('send-message', noti);
        });
      });
    });
  });
};

// export const message = (io) => {
//   io.on('connection', (socket) => {
//     socket.on('disconnect', () => {
//       // console.log("disconnect");
//     });
//     socket.on('test', (data) => {
//       socket.emit('test1', 'mess');
//     });
//     socket.on('send-message', (room, data) => {
//       if (room === '') {
//         socket.broadcast.emit('private-message', data);
//       } else {
//         console.log(room, data);
//         socket.in(room).emit('private-message', data);
//       }
//     });

//     socket.on('join-room', (room) => {
//       socket.join(room);
//     });
//   });
// };
