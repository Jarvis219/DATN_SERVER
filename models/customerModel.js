import mongoose from 'mongoose';
const CustomerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    customer_email: {
      type: String,
      maxLength: 50,
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
      maxLength: 1000,
    },
    // 0 nam | 1 nữ
    customer_gender: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', CustomerSchema);
