import EmployeeJobDetail from "../models/employeeJobDetailModel";
import _ from "lodash";

export const listEmployeeJobDetail = (req, res) => {
  EmployeeJobDetail.find()
    .populate([
      { path: "service_id" },
      { path: "staff_id", populate: { path: "user_id" } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          error: "Employee job detail not found!",
        });
      }
      res.status(200).json({ data });
    });
};

export const createEmployeeJobDetail = (req, res) => {
  const employeeJobDetail = new EmployeeJobDetail(req.body);
  employeeJobDetail.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Add employee job detail failed!",
      });
    }
    res.json({
      data,
      message: "Create employee job detail successfully",
    });
  });
};

export const employeeJobDetailId = (req, res, next, id) => {
  EmployeeJobDetail.findById(id)
    .populate([
      { path: "service_id" },
      { path: "staff_id", populate: { path: "user_id" } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(404).json({
          error: "employee job detail not found!",
        });
      }
      req.employeeJobDetail = data;
      next();
    });
};

export const readEmployeeJobDetail = (req, res) => {
  return res.json(req.employeeJobDetail);
};

export const removeEmployeeJobDetail = (req, res) => {
  let employeeJobDetail = req.employeeJobDetail;
  employeeJobDetail.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete employee job detail failed!",
      });
    }
    res.json({
      message: "Delete employee job detail successfully",
      data,
    });
  });
};

export const updateEmployeeJobDetail = (req, res) => {
  let employeeJobDetail = req.employeeJobDetail;
  employeeJobDetail = _.assignIn(employeeJobDetail, req.body);
  employeeJobDetail.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update employee job detail failed!",
      });
    }
    res.json({
      message: "Update employee job detail successfully",
      data,
    });
  });
};

export const findStaffToId = (req, res, next) => {
  let staff = req.query.staff ? req.query.staff : "";
  const ObjectId = require("mongodb").ObjectId;
  const id = new ObjectId(staff);
  EmployeeJobDetail.findOne({
    staff_id: id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Data does not exist",
      });
    }
    req.updateEmployee = data;
    next();
  });
};

export const updateSchedule = (req, res) => {
  let employeeJobDetail = req.updateEmployee;
  employeeJobDetail = Object.assign(employeeJobDetail, {
    schedule: [...employeeJobDetail.schedule, req.body.schedule],
  });

  employeeJobDetail.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update employee job detail failed!",
      });
    }
    res.json({
      message: "Update employee job detail successfully",
      data,
    });
  });
};