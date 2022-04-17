import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const appointmentTreatmentDetail = new mongoose.Schema(
  {
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      required: true,
    },
    staff_id: {
      type: ObjectId,
      required: true,
      ref: 'Staff',
    },
    appointment_treatment_id: {
      type: ObjectId,
      required: true,
      ref: 'AppointmentTreatment',
    },
    note: {
      type: String,
    },
    number_treatment: {
      type: Number,
      required: true,
      default: 0,
    },
    notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'AppointmentTreatmentDetail',
  appointmentTreatmentDetail
);
