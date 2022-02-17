import Service from '../models/serviceModel';
import _ from 'lodash';

export const listService = (req, res) => {
  Service.find()
    .sort({
      updatedAt: -1,
    })
    .populate('category', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const serviceId = (req, res, next, id) => {
  Service.findById(id)
    .populate('category', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.service = data;
      next();
    });
};

export const readService = (req, res) => {
  return res.json(req.service);
};

export const removeServices = (req, res) => {
  let service = req.service;
  service.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'delete service failure',
      });
    }
    res.json({
      message: 'Delete product successfully',
    });
  });
};

export const createService = (req, res) => {
  const service = new Service(req.body);
  service.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create product successfully',
    });
  });
};

export const updateService = (req, res) => {
  let service = req.service;
  service = _.assignIn(service, req.body);

  service.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update product successfully',
    });
  });
};

export const listServiceRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 4;
  Service.find({
    _id: {
      $ne: req.service, // loại trừ
    },
    category: req.service.category, // lấy theo thể loại
  })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

export const listSearch = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : '';
  Service.find({
    name: {
      $regex: `${name}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'Product not found',
        });
      }
      res.json({ data });
    });
};

export const filterCategory = (req, res) => {
  let category = req.query.category ? req.query.category : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(category);
  Service.findOne({
    category: id,
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
