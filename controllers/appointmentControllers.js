import Appointment from '../models/appointmentModel';
import _ from 'lodash';

export const listAppointment = (req, res) => {
  Appointment.find()
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

export const createAppointment = (req, res) => {
  const appointment = new Appointment(req.body);
  appointment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add Appointment failed!',
      });
    }
    res.json({
      data,
      message: 'Create Appointment successfully',
    });
  });
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

export const updateAppointment = (req, res) => {
  let appointment = req.appointment;
  appointment = _.assignIn(appointment, req.body);
  appointment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update Appointment failed!',
      });
    }
    res.json({
      message: 'Update appointment successfully',
      data,
    });
  });
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
