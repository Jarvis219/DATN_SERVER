import mongoose from "mongoose";
import moment from "moment-timezone";
const { ObjectId } = mongoose.Schema;
const WorkdayHistory = new mongoose.Schema(
  {
    time_start: {
      type: String,
      required: true,
      default:
        moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY") + " 08:00:00",
    },
    time_end: {
      type: String,
      required: true,
      default:
        moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY") + " 17:00:00",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkdayHistory", WorkdayHistory);