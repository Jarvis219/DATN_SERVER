import Appointment from '../models/appointmentModel';
import _ from 'lodash';

export const listAppointment = (req, res) => {
  Appointment.find()
    .sort({
      updatedAt: -1,
    })
    .populate([
      { path: 'service_id' },
      { path: 'customer_id' },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          error: 'Appointment not found!',
        });
      }
      res.status(200).json({ data });
    });
};

export const createAppointment = async (req, res) => {
  const appointment = await new Appointment(req.body);
  try {
    const currentAppointment = await appointment.save();
    const data = await currentAppointment.populate([
      { path: 'service_id' },
      { path: 'customer_id' },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ]);
    return res.json({
      data,
      message: 'Create Appointment successfully',
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Add Appointment failed!',
    });
  }
};

export const appointmentId = (req, res, next, id) => {
  Appointment.findById(id)
    .populate([
      { path: 'service_id' },
      { path: 'customer_id' },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(404).json({
          error: 'Appointment not found!',
        });
      }
      req.appointment = data;
      next();
    });
};

export const readAppointment = (req, res) => {
  return res.json(req.appointment);
};

export const removeAppointment = (req, res) => {
  let appointment = req.appointment;
  appointment.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete appointment failed!',
      });
    }
    res.json({
      message: 'Delete appointment successfully',
      data,
    });
  });
};

export const updateAppointment = async (req, res) => {
  let appointment = req.appointment;
  appointment = _.assignIn(appointment, req.body);
  try {
    const currentAppointment = await appointment.save();
    const data = await currentAppointment.populate([
      { path: 'service_id' },
      { path: 'customer_id' },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ]);
    return res.json({
      message: 'Update appointment successfully',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Update Appointment failed!',
    });
  }
};

export const listAppointmentRelated = (req, res) => {
  Appointment.find({
    appointment_id: { $ne: req.appointment },
  }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: 'Appointment not found!',
      });
    }
    res.json({ data });
  });
};
