import TreatmentAppointment from "../models/appointmentTreatmentModel";
import _ from "lodash";

export const listTreatmentAppointment = (req, res) => {
  TreatmentAppointment.find()
    .populate([{ path: "treatment_id" }, { path: "customer_id" }])
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

export const appointmentTreatmentByCustomer = (req, res) => {
  TreatmentAppointment.find({ customer_id: req.customer._id })
    .sort({
      updatedAt: -1,
    })
    .populate("customer_id", "_id customer_name customer_phone")
    .populate({path: "treatment_id"})
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Appointment Treatment not found",
        });
      }
      res.json(data);
    });
};

export const treatmentId = (req, res, next, id) => {
  TreatmentAppointment.findById(id)
    .populate([{ path: "treatment_id" }, { path: "customer_id" }])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.treatmentAppointment = data;
      next();
    });
};

export const readTreatment = (req, res) => {
  return res.json(req.treatmentAppointment);
};

export const removeTreatmentAppointment = (req, res) => {
  let treatmentAppointment = req.treatmentAppointment;
  treatmentAppointment.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: "Delete treatment Appointment failure",
      });
    }
    res.json({
      message: "Delete treatment Appointment successfully",
    });
  });
};

export const createTreatmentAppointment = async (req, res) => {
  const treatmentAppointment = new TreatmentAppointment(req.body);

  try {
    const curr = await treatmentAppointment.save();
    const data = await curr.populate([
      { path: "treatment_id" },
      { path: "customer_id" },
    ]);
    res.json({
      data,
      message: "Create treatment Appointment successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
};

export const updateTreatmentAppointment = async (req, res) => {
  let treatmentAppointment = req.treatmentAppointment;
  treatmentAppointment = _.assignIn(treatmentAppointment, req.body);
  try {
    const curr = await treatmentAppointment.save();
    const data = await curr.populate([
      { path: "treatment_id" },
      { path: "customer_id" },
    ]);
    res.json({
      data,
      message: "Update treatment Appointment successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
