import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const AppointmentSchema = new mongoose.Schema(
  {
    appointment_description: {
      type: String,
      maxLength: 1000,
    },
    customer_id: {
      type: ObjectId,
      ref: 'Customer',
      required: true,
    },
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
    appointment_date: {
      type: String,
      required: true,
    },
    appointment_status: {
      type: Number,
      required: true,
      default: 0,
    },
    status_notification: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
