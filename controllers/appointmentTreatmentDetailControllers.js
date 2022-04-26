import AppointmentTreatmentDetail from '../models/appointmentTreatmentDetailModel';
import _ from 'lodash';

export const listAppointmentTreatmentDetail = (req, res) => {
  AppointmentTreatmentDetail.find()
    .populate([
      {
        path: 'appointment_treatment_id',
        populate: 'customer_id treatment_id',
      },

      { path: 'staff_id', populate: { path: 'user_id' } },
    ])
    .sort({
      updatedAt: -1,
    })
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }

      return res.status(200).json({ data });
    });
};

export const treatmentId = (req, res, next, id) => {
  AppointmentTreatmentDetail.findById(id)
    .populate([
      {
        path: 'appointment_treatment_id',
        populate: 'customer_id treatment_id',
      },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.appointmentTreatmentDetail = data;
      next();
    });
};

export const readTreatment = (req, res) => {
  return res.json(req.AppointmentTreatmentDetail);
};

export const removeAppointmentTreatmentDetail = (req, res) => {
  let appointmentTreatmentDetail = req.appointmentTreatmentDetail;
  appointmentTreatmentDetail.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete treatment appointment failure',
      });
    }
    res.json({
      message: 'Delete treatment appointment successfully',
    });
  });
};

export const createAppointmentTreatmentDetail = async (req, res) => {
  const appointmentTreatmentDetail = new AppointmentTreatmentDetail(req.body);

  try {
    const curr = await appointmentTreatmentDetail.save();
    const data = await curr.populate([
      {
        path: 'appointment_treatment_id',
        populate: 'customer_id treatment_id',
      },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ]);
    res.json({
      data,
      message: 'Create  appointment treatment successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
};

export const updateAppointmentTreatmentDetail = async (req, res) => {
  let appointmentTreatmentDetail = req.appointmentTreatmentDetail;
  appointmentTreatmentDetail = _.assignIn(appointmentTreatmentDetail, req.body);
  try {
    const curr = await appointmentTreatmentDetail.save();
    const data = await curr.populate([
      {
        path: 'appointment_treatment_id',
        populate: 'customer_id treatment_id',
      },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ]);
    res.json({
      data,
      message: 'Update treatment appointment successfully',
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
