import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const WorkDaySchema = new mongoose.Schema(
  {
    staff_id: {
      type: ObjectId,
      ref: 'Staff',
      required: true,
    },
    service_id: {
      type: ObjectId,
      ref: 'Service',
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkDay', WorkDaySchema);
