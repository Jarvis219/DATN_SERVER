import mongoose from 'mongoose';
import moment from 'moment';
const { ObjectId } = mongoose.Schema;
const WorkdayHistory = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      default: moment().format('YYYY-MM-DD') + ' 08:00:00',
    },
    staff_id: {
      type: ObjectId,
      required: true,
      ref: 'Staff',
    },
    workday_status: {
      type: Number,
      required: true,
      default: 4,
    },
    workday_description: {
      type: String,
      maxLength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkdayHistory', WorkdayHistory);
