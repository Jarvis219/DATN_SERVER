import Staff from '../models/staffModel';
import _ from 'lodash';

export const listStaff = (req, res) => {
  Staff.find()
    .sort({
      updatedAt: -1,
    })
    .populate('position_id', 'position_name')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const staffId = (req, res, next, id) => {
  Staff.findById(id)
    .populate('position_id', 'position_name')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.staff = data;
      next();
    });
};

export const readStaff = (req, res) => {
  return res.json(req.staff);
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

export const createStaff = (req, res) => {
  const staff = new Staff(req.body);
  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create staff successfully',
    });
  });
};

export const updateStaff = (req, res) => {
  let staff = req.staff;
  staff = _.assignIn(staff, req.body);

  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update staff successfully',
    });
  });
};

export const searchStaff = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : '';
  Staff.find({
    name: {
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
