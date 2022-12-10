import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const appointmentTreatment = new mongoose.Schema(
  {
    treatment_id: {
      type: ObjectId,
      required: true,
      ref: 'Treatment',
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    customer_id: {
      type: ObjectId,
      required: true,
      ref: 'Customer',
    },
    note: {
      type: String,
    },
    progress: {
      type: String,
      required: true,
      default: '0/0',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AppointmentTreatment', appointmentTreatment);
