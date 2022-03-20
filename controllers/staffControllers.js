import Staff from '../models/staffModel';
import EmployeeJobDetail from '../models/employeeJobDetailModel';

import _ from 'lodash';

export const listStaff = (req, res) => {
  Staff.find()
    .sort({
      updatedAt: -1,
    })
    .populate('user_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const staffId = (req, res, next, id) => {
  Staff.findById(id)
    .populate('user_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.staff = data;
      next();
    });
};

export const readStaff = (req, res) => {
  let user_id = req.query.user_id ? req.query.user_id : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(user_id);
  Staff.findOne({
    user_id: id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: 'data does not exist',
      });
    }
    res.json({ data });
  });
};

export const removeStaff = (req, res) => {
  let staff = req.staff;
  staff.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'delete staff failure',
      });
    }
    res.json({
      message: 'Delete staff successfully',
    });
  });
};

export const createStaff = (req, res, next) => {
  const staff = new Staff(req.body);
  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!req.body.service_id) {
      return res.json({ data });
    }
    req.staffWork = {
      staff_id: data._id,
      service_id: req.body.service_id,
    };
    req.newStaff = data;
    next();
  });
};

export const createEmployeeJobDetail = (req, res) => {
  const employeeJobDetail = new EmployeeJobDetail(req.staffWork);
  employeeJobDetail.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Add employee job detail failed!',
      });
    }
    res.json({
      data: req.newStaff,
      message: 'Create employee job detail successfully',
      work: data,
    });
  });
};

export const updateStaff = (req, res, next) => {
  let staff = req.staff;
  staff = _.assignIn(staff, req.body);

  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    req.updateStaff = {
      staff_id: data._id,
      service_id: req.body.service_id,
    };
    req.updateNew = data;
    next();
  });
};

export const findStaffInJob = (req, res, next) => {
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(req.updateStaff.staff_id);
  EmployeeJobDetail.findOne({
    staff_id: id,
  })
    .populate([
      { path: 'service_id' },
      { path: 'staff_id', populate: { path: 'user_id' } },
    ])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          err,
          error: 'Data does not exist',
        });
      }
      req.dataJob = {
        id: data._id,
        ...req.updateStaff,
      };
      req.employeeJobDetail = data;
      next();
    });
};

export const updateEmployeeJobDetail = (req, res) => {
  let employeeJobDetail = req.employeeJobDetail;
  employeeJobDetail = _.assignIn(employeeJobDetail, req.dataJob);
  employeeJobDetail.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update employee job detail failed!',
      });
    }
    res.json({
      data: req.updateNew,
      message: 'Update staff and employee job detail successfully',
      employeeJobDetail: data,
    });
  });
};

export const searchStaff = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : '';
  Staff.find({
    status: {
      $regex: `${name}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'Staff not found',
        });
      }
      res.json({ data });
    });
};

export const findStaff = (req, res) => {
  let userId = req.query.userId ? req.query.userId : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(userId);
  Staff.findOne({
    user_id: id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: 'data does not exist',
      });
    }
    res.json({ data });
  });
};
