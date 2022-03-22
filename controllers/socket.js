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
        case "notification-create-order":
          break;
        case "list-notifications-order":
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
