import WorkDay from "../models/workDayModel";
import _ from "lodash";

export const listWorkDay = (req, res) => {
  WorkDay.find()
    .sort({
      updatedAt: -1,
    })
    .populate([
      { path: "service_id" },
      { path: "staff_id", populate: { path: "user_id" } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const workDayId = (req, res, next, id) => {
  WorkDay.findById(id)
    .populate([
      { path: "service_id" },
      { path: "staff_id", populate: { path: "user_id" } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.workDay = data;
      next();
    });
};

export const readWorkDay = (req, res) => {
  return res.json(req.workDay);
};

export const removeWorkDay = (req, res) => {
  let workDay = req.workDay;
  workDay.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: "delete work day failure",
      });
    }
    res.json({
      message: "Delete work day successfully",
    });
  });
};

export const createWorkDay = (req, res) => {
  const workDay = new WorkDay(req.body);
  workDay.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: "Create work day successfully",
    });
  });
};

export const updateWorkDay = (req, res) => {
  let workDay = req.workDay;
  workDay = _.assignIn(workDay, req.body);

  workDay.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: "Update work day successfully",
    });
  });
};

export const filterStaff = (req, res) => {
  let staff = req.query.staff ? req.query.staff : "";
  const ObjectId = require("mongodb").ObjectId;
  const id = new ObjectId(staff);
  WorkDay.findOne({
    staff_id: id,
  }).exec(async (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Data does not exist",
      });
    }
    // update staff
    const mes = await updateWorkDayStaff(data.staff_id, req.body.days);
    res.json({ mes });
  });
};

async function updateWorkDayStaff(staffId, days) {
  const filter = { staff_id: staffId };
  try {
    const data = await WorkDay.findOneAndUpdate(filter, { days: days });
    return { data, message: "update work day staff successfully" };
  } catch (error) {
    return error;
  }
}
