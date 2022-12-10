import moment from 'moment-timezone';
import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    times: {
      type: String,
      required: true,
      default: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD hh:mm:ss'),
    },
    album: {
      type: Array,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
