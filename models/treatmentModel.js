import mongoose from 'mongoose';
const treatmentSchema = new mongoose.Schema(
  {
    number_of_treatments: {
      type: Number,
      required: true,
      default: 1,
    },
    treatment_name: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Treatment', treatmentSchema);
