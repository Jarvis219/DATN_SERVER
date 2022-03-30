import WorkdayHistory from '../models/workdayHistoryModel';
import _ from 'lodash';

export const listWorkdayHistory = (req, res) => {
  WorkdayHistory.find()
    .populate('staff_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          error: 'Workday History not found!',
        });
      }
      res.status(200).json({ data });
    });
};

export const createWorkdayHistory = (req, res) => {
  const workdayHistory = new WorkdayHistory(req.body);
  workdayHistory.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add workday history failed!',
      });
    }
    res.json({
      data,
      message: 'Create workday history successfully',
    });
  });
};

export const workdayHistoryId = (req, res, next, id) => {
  WorkdayHistory.findById(id)
    .populate('staff_id')
    .exec((err, data) => {
      if (err) {
        return res.status(404).json({
          error: 'Workday history not found!',
        });
      }
      req.workdayHistory = data;
      next();
    });
};

export const readWorkdayHistory = (req, res) => {
  return res.json(req.workdayHistory);
};

export const removeWorkdayHistory = (req, res) => {
  let workdayHistory = req.workdayHistory;
  workdayHistory.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete workday history failed!',
      });
    }
    res.json({
      message: 'Delete workday history successfully',
      data,
    });
  });
};

export const updateWorkdayHistory = (req, res) => {
  let workdayHistory = req.workdayHistory;
  workdayHistory = _.assignIn(workdayHistory, req.body);
  workdayHistory.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update Workday history failed!',
      });
    }
    res.json({
      message: 'Update Workday history successfully',
      data,
    });
  });
};

export const findWorkDayHistoryByStaffId = (req, res) => {
  WorkdayHistory.find({
    $and: [{ staff_id: req.query.staffId }, { day: req.query.day }],
  })
    .populate([{ path: 'staff_id', populate: { path: 'user_id' } }])
    .exec((err, data) => {
      if (err) {
        return res.status(404).json({
          error: 'Workday history not found!',
        });
      }
      res.status(200).json({ data });
    });
};
