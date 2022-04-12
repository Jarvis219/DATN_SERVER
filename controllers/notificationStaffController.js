import NotificationStaff from "../models/notificationStaffModel";
import _ from "lodash";

export const listNotificationStaff = (staffId) => {
	const ObjectId = require("mongodb").ObjectId;
	const id = new ObjectId(staffId);
	return new Promise((resolve, reject) => {
		NotificationStaff.find({ staff_id: id })
			.populate([
				{ path: "staff_id", populate: { path: "user_id" } },
				{ path: "user_id" },
			])
			.sort({
				updatedAt: -1,
			})
			.exec((err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
	});
};

export const listNotiToUser = (id) => {
	const ObjectId = require("mongodb").ObjectId;
	const userId = new ObjectId(id);
	return new Promise((resolve, reject) => {
		NotificationStaff.find({ user_id: userId })
			.populate("user_id")
			.sort({
				updatedAt: -1,
			})
			.exec((err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
	});
};

export const listNotiOrder = () => {
	return new Promise((resolve, reject) => {
		NotificationStaff.find()
			.populate("user_id order_id")
			.sort({
				updatedAt: -1,
			})
			.exec((err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
	});
};

export const listNotifications = () => {
	return new Promise((resolve, reject) => {
		NotificationStaff.find()
			.populate([{ path: "staff_id", populate: { path: "user_id" } }])
			.sort({
				updatedAt: -1,
			})
			.exec((err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
	});
};

export const createNotificationStaff = (data) => {
	const notificationStaff = new NotificationStaff(data);
	return new Promise((resolve, reject) => {
		notificationStaff.save((err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

export const removeNotificationStaff = (idNoti) => {
	return new Promise((resolve, reject) => {
		NotificationStaff.find({ _id: idNoti })
			.remove()
			.exec((err) => {
				if (err) {
					reject(err);
				}
				resolve("remove success");
			});
	});
};
