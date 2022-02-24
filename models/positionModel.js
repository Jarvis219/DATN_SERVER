import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const PositionSchema = new mongoose.Schema(
  {
    position_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    service_id: {
      type: ObjectId,
      ref: "Service",
      required: true,
    },
    staff_id: {
      type: ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Position", PositionSchema);
