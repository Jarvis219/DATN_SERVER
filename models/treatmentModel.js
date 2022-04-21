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
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    treatment_price: {
      type: Number,
      required: true,
      default: 0,
    },
    treatment_sale: {
      type: Number,
      required: true,
      default: 0,
    },
    treatment_duration: {
      type: Number,
      required: true,
      default: 0,
    },
    treatment_description: {
      type: String,
      maxlength: 500,
    },
    album: {
      type: Array,
      default: [],
    },
    treatment_star: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Treatment', treatmentSchema);
