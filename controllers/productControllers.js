import Product from '../models/productModel';
import _ from 'lodash';

export const listProduct = (req, res) => {
  Product.find()
    .sort({
      updatedAt: -1,
    })
    .populate('category_id', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ data });
    });
};

export const createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, data) => {
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

export const productId = (req, res, next, id) => {
  Product.findById(id)
    .populate('category_id', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      req.product = data;
      next();
    });
};

export const readProduct = (req, res) => {
  return res.json(req.product);
};

export const removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete product failure',
      });
    }
    res.json({
      message: 'Delete product successfully',
    });
  });
};

export const updateProduct = (req, res) => {
  let product = req.product;
  product = _.assignIn(product, req.body);

  product.save((err, data) => {
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

export const listProductRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 4;
  Product.find({
    _id: {
      $ne: req.product, // loại trừ
    },
    category: req.product.category, // lấy theo thể loại
  })
    .limit(limit)
    .populate('category_id', '_id name')
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
  Product.find({
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
  Product.findOne({
    category: id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: 'Data does not exist',
      });
    }
    res.json({ data });
  });
};
