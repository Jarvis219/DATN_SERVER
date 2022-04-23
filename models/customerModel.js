import mongoose from 'mongoose';
const CustomerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      default: 'null',
      maxLength: 100,
    },
    customer_email: {
      type: String,
      maxLength: 100,
    },
    customer_phone: {
      type: String,
      required: true,
      maxLength: 11,
    },
    customer_address: {
      type: String,
      maxLength: 100,
    },
    customer_birth: {
      type: Date,
    },
    customer_description: {
      type: String,
    },
    // 0 nam | 1 nữ
    customer_gender: {
      type: Number,
    },
    /**
     * 0: 'Chưa liên hệ',
       1: 'Đã liên hệ',
       2: 'Đã đặt lịch thành công',
       3: 'Đã đặt lịch thất bại'
     */
    status: {
      required: true,
      default: 0,
      type: Number,
    },
    /**
     * 0 appointment
     * 1 treatment
     */
    customer_type: {
      required: true,
      type: Number,
      default: 0,
    },
    counts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', CustomerSchema);
