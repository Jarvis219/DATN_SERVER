import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const EmployeeJobDetailSchema = new mongoose.Schema(
  {
    service_id: {
      type: ObjectId,
      required: true,
      ref: "Service",
      unique: true,
    },
    staff_id: {
      type: ObjectId,
      required: true,
      ref: "Staff",
      unique: true,
    },
    schedule: {
      type: Array,
    },
    dayOff: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmployeeJobDetail", EmployeeJobDetailSchema);
