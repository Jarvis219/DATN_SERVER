import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const UserServiceSchema = new mongoose.Schema(
  {
    staff_id: {
      type: ObjectId,
      ref: 'Staff',
      required: true,
    },
    star: {
      type: Number,
      required: true,
      maxLength: 5,
      default: 5,
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
    service_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    service_price: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 21,
    },
    service_sale: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 21,
    },
    name_guest: {
      type: String,
      required: true,
      maxLength: 100,
    },
    phone_number: {
      type: String,
      required: true,
      maxLength: 100,
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

module.exports = mongoose.model('UserService', UserServiceSchema);
