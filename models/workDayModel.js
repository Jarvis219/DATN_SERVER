import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const WorkDaySchema = new mongoose.Schema(
  {
    staff_id: {
      type: ObjectId,
      ref: 'Staff',
      required: true,
    },
    day: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkDay', WorkDaySchema);
