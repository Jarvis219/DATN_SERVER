import mongoose from "mongoose";
const Contact = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      maxLength: 100,
    },
    phone: {
      type: String,
      maxLength: 11,
    },
    content: {
      type: String,
      required: true,
    },
    content_confirm: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", Contact);
