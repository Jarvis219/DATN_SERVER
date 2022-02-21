import Salary from '../models/salaryModel';
import _ from 'lodash';

export const listSalary = (req, res) => {
  Salary.find()
    .sort({
      updatedAt: -1,
    })
    .populate('user_id staff_id work_day_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const salaryId = (req, res, next, id) => {
  Salary.findById(id)
    .populate('user_id staff_id work_day_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.salary = data;
      next();
    });
};

export const readSalary = (req, res) => {
  return res.json(req.salary);
};

export const removeSalary = (req, res) => {
  let salary = req.salary;
  salary.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete salary failure',
      });
    }
    res.json({
      message: 'Delete salary successfully',
    });
  });
};

export const createSalary = (req, res) => {
  const salary = new Salary(req.body);
  salary.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create salary successfully',
    });
  });
};

export const updateSalary = (req, res) => {
  let salary = req.salary;
  salary = _.assignIn(salary, req.body);

  salary.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update salary successfully',
    });
  });
};

export const searchSalary = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let option = req.query.option ? req.query.option : '';
  Salary.find({
    user_id: {
      $regex: `${option}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'Salary not found',
        });
      }
      res.json({ data });
    });
};

export const filterStaff = (req, res) => {
  let staff = req.query.staff ? req.query.staff : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(staff);
  Salary.findOne({
    staff_id: id,
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
