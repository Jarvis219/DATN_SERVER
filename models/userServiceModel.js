import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const UserServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    staff_id: {
      type: ObjectId,
      ref: "Staff",
      required: true,
    },
    service_id: {
      type: ObjectId,
      ref: "Service",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      maxLength: 5,
      default: 0,
    },
    totalMoney: {
      type: Number,
      required: true,
      maxLength: 21,
      default: 0,
    },
    status: {
      type: String,
      maxLength: 10,
    },
    startDay: {
      type: Date,
      default: Date.now,
    },
    endDay: {
      type: Date,
      default: Date.now,
    },
    // khoảng thời gian mà dịch vụ này thực hiện (value: house)
    period: {
      type: String,
    },
    service_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    service_price: {
      type: Number,
      required: true,
      maxLength: 21,
    },
    service_sale: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 21,
    },
    service_album: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserService", UserServiceSchema);
