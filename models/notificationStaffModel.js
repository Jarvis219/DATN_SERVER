import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const NotificationStaff = new mongoose.Schema(
  {
    staff_id: {
      type: ObjectId,
      required: true,
      ref: "Staff",
    },
    appointments_id: {
      type: ObjectId,
      ref: "Appointment",
    },
    order_id: {
      type: ObjectId,
      ref: "Order",
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
    period: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationStaff", NotificationStaff);
