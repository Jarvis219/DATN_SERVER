import Service from '../models/serviceModel';
import _ from 'lodash';

export const listService = (req, res) => {
  Service.find()
    .sort({
      updatedAt: -1,
    })
    .populate([{ path: 'category_id' }, { path: 'brand_id' }])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ data });
    });
};

export const serviceId = (req, res, next, id) => {
  Service.findById(id)
    .populate('category_id', 'category_name')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
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
    res.status(200).json({
      message: 'Delete service successfully',
    });
  });
};

export const createService = async (req, res) => {
  const service = new Service(req.body);
  try {
    const dataService = await service.save();
    const data = await dataService.populate('category_id', 'category_name');
    return res.status(200).json({
      message: 'Create service successfully',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Create failed',
    });
  }

  // service.save((err, data) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     });
  //   }
  //   res.json({
  //     data,
  //     message: 'Create service successfully',
  //   });
  // });
};

export const updateService = async (req, res) => {
  let service = req.service;
  service = _.assignIn(service, req.body);

  try {
    const dataService = await service.save();
    const data = await dataService.populate('category_id', 'category_name');
    return res.status(200).json({
      message: 'Update service successfully',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Update failed',
    });
  }
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
    .populate('category_id', 'category_name')
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
          error: 'Service not found',
        });
      }
      res.json({ data });
    });
};

export const filterCategory = (req, res) => {
  let category = req.query.category ? req.query.category : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(category);
  Service.find({
    category_id: id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: 'data does not exist',
      });
    }
    res.status(200).json({ data });
  });
};
