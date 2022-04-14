import {
	createNotificationStaff,
	listNotificationStaff,
	removeNotificationStaff,
	listNotifications,
	listNotiToUser,
} from "../controllers/notificationStaffController";

export const notification = (io) => {
	io.on("connection", (socket) => {
		socket.on("disconnect", () => {});
		socket.on("notifications", (room, id) => {
			switch (room) {
				case "create-notifications-service":
					createNotificationStaff(id).then((data) => {
						listNotificationStaff(data.staff_id).then((noti) => {
							socket.broadcast.emit(`send-notification-${data.staff_id}`, noti);
						});
						listNotifications().then((noti) => {
							socket.emit(`send-notification-admin`, noti);
						});
						sendToAdmin(socket);
					});
					break;
				case "list-notifications":
					listNotificationStaff(id.id).then((noti) => {
						socket.emit(`send-notification-${id.id}`, noti);
					});
					break;
				case "notification-admin-room":
					listNotifications().then((noti) => {
						socket.emit(`send-notification-admin`, noti);
					});
					break;
				case "notification-create-order":
					createNotificationStaff(id).then((data) => {
						listNotiToUser(data.user_id).then((noti) => {
							socket.emit(`send-notification-${data.user_id}`, noti);
						});
						sendToAdmin(socket);
					});
					break;
				case "list-notifications-order":
					listNotiToUser(id.id).then((noti) => {
						socket.emit(`send-notification-${id.id}`, noti);
					});
					break;
				case "notification-change-permission":
					createNotificationStaff(id)
						.then((data) => {
							listNotificationStaff(data.staff_id).then((noti) => {
								socket.broadcast.emit(
									`send-notification-${data.staff_id}`,
									noti
								);
							});
							listNotifications().then((noti) => {
								socket.emit(`send-notification-admin`, noti);
							});
						})
						.catch((err) => {
							console.log(err);
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

const sendToAdmin = (socket) => {
	listNotifications().then((noti) => {
		socket.broadcast.emit(`send-notification-admin`, noti);
	});
};
