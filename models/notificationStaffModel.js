import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const NotificationStaff = new mongoose.Schema(
	{
		staff_id: {
			type: ObjectId,
			required: true,
			ref: "Staff",
		},
		order_id: {
			type: ObjectId,
			ref: "Order",
		},
		path_url: {
			type: String,
		},
		path_id: {
			type: String,
		},
		photo: {
			type: String,
		},
		title: {
			type: String,
			required: true,
			default: "Thông báo",
		},
		content: {
			type: String,
			required: true,
			default: "notification",
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		},
		// 0: 'notifications-service',
		// 1: 'notifications-order',
		// 2: 'notifications-permission',
		type: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("NotificationStaff", NotificationStaff);
