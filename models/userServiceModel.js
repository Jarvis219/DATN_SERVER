import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const UserServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    phoneNumber: {
      type: String,
      maxlength: 11,
      required: true,
    },
    staff_name: {
      type: String,
      required: true,
    },
    name_guest: {
      type: String,
      maxLength: 100,
      required: true,
    },
    service_name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      maxLength: 10,
    },
    // khoảng thời gian mà dịch vụ này thực hiện (value: date)
    period: {
      type: String,
    },
    star: {
      type: Number,
      default: 5,
    },
    service_price: {
      type: Number,
      default: 0,
      required: true,
    },
    service_sale: {
      type: Number,
      default: 0,
      required: true,
    },
    service_photo: {
      type: String,
    },
    note: {
      type: String,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserService", UserServiceSchema);
