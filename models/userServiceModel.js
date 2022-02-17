import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const UserServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    staff_id: {
      type: ObjectId,
      ref: 'Staff',
      required: true,
    },
    service_id: {
      type: ObjectId,
      ref: 'Service',
      // required: true,
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
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
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
    category_id: {
      type: ObjectId,
      ref: 'Category',
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserService', UserServiceSchema);
