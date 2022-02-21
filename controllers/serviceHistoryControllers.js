import ServiceHistory from '../models/serviceHistoryModel';
import _ from 'lodash';

export const listServiceHistory = (req, res) => {
  ServiceHistory.find()
    .sort({
      updatedAt: -1,
    })
    .populate('user_id user_service_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const serviceHistoryId = (req, res, next, id) => {
  ServiceHistory.findById(id)
    .populate('user_id user_service_id')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.serviceHistory = data;
      next();
    });
};

export const readServiceHistory = (req, res) => {
  return res.json(req.serviceHistory);
};

export const removeServiceHistory = (req, res) => {
  let serviceHistory = req.serviceHistory;
  serviceHistory.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'delete service history failure',
      });
    }
    res.json({
      message: 'Delete service history successfully',
    });
  });
};

export const createServiceHistory = (req, res) => {
  const serviceHistory = new ServiceHistory(req.body);
  serviceHistory.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create service history successfully',
    });
  });
};

export const updateServiceHistory = (req, res) => {
  let serviceHistory = req.serviceHistory;
  serviceHistory = _.assignIn(serviceHistory, req.body);

  serviceHistory.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update service history successfully',
    });
  });
};

export const searchServiceHistory = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : '';
  ServiceHistory.find({
    service_name: {
      $regex: `${name}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'Service history not found',
        });
      }
      res.json({ data });
    });
};
