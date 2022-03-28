import mongoose from "mongoose";
import moment from "moment-timezone";

const { ObjectId } = mongoose.Schema;
const WorkdayHistory = new mongoose.Schema(
  {
    time_start: {
      type: String,
      required: true,
      default: "0",
    },
    time_end: {
      type: String,
      required: true,
      default: "0",
    },
    staff_id: {
      type: ObjectId,
      required: true,
      ref: "Staff",
    },
    // 4|2 đi làm| nghỉ làm
    workday_status: {
      type: Number,
      required: true,
      default: 2,
    },
    workday_description: {
      type: String,
      maxLength: 1000,
    },
    day: {
      type: String,
      required: true,
      default: moment().tz("Etc/GMT-7").format("YYYY-MM-DD"),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkdayHistory", WorkdayHistory);
