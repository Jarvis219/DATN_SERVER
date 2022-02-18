import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const SalarySchema = new mongoose.Schema(
  {
    salary_basic: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 12,
    },
    user_id: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    staff_id: {
      type: ObjectId,
      ref: 'Staff',
      required: true,
    },
    work_day_id: {
      type: ObjectId,
      ref: 'WorkDay',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Salary', SalarySchema);
