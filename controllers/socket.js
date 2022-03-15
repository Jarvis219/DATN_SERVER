import {
  createNotificationStaff,
  listNotificationStaff,
  removeNotificationStaff,
  listNotifications,
} from "../controllers/notificationStaffController";

export const notification = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {});
    socket.on("notifications-service", (room, id) => {
      switch (room) {
        case "create-notifications-service":
          createNotificationStaff(id).then((data) => {
            listNotificationStaff(data.staff_id).then((noti) => {
              socket.broadcast.emit(
                `send-notification-service-${data.staff_id}`,
                noti
              );
            });
            listNotifications().then((noti) => {
              socket.broadcast.emit(`send-notification-admin`, noti);
            });
          });
          break;
        case "list-notifications-service":
          listNotificationStaff(id.id).then((noti) => {
            socket.emit(`send-notification-service-${id.id}`, noti);
          });
          break;
        case "notification-admin-room":
          listNotifications().then((noti) => {
            socket.emit(`send-notification-admin`, noti);
          });
          break;
        default:
          break;
      }
    });

    socket.on("remove-notification", (id) => {
      removeNotificationStaff(id).then((data) => {
        listNotificationStaff(data.staff_id).then((noti) => {
          socket.broadcast.emit("send-message", noti);
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
