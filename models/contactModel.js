import mongoose from "mongoose";
const Contact = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      maxLength: 50,
    },
    phone: {
      type: String,
      maxLength: 11,
    },
    content: {
      type: String,
      required: true,
      maxLength: 500,
    },
    content_confirm: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", Contact);
