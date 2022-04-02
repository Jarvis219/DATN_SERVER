import Brand from '../models/brandModel';
import _ from 'lodash';

export const listBrands = (req, res) => {
  Brand.find()
    .sort({
      updatedAt: -1,
    })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Brand not found!',
        });
      }
      res.status(200).json({ data });
    });
};

export const createBrand = (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add brand failed!',
      });
    }
    res.json({
      data,
      message: 'Create brand successfully',
    });
  });
};

export const brandId = (req, res, next, id) => {
  Brand.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: 'Brand not found!',
      });
    }
    req.brand = data;
    next();
  });
};

export const readBrand = (req, res) => {
  return res.json(req.brand);
};

export const removeBrand = (req, res) => {
  let brand = req.brand;
  brand.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete brand failed!',
      });
    }
    res.json({
      message: 'Delete brand successfully',
      data,
    });
  });
};

export const updateBrand = (req, res) => {
  let brand = req.brand;
  brand = _.assignIn(brand, req.body);
  brand.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update brand failed!',
      });
    }
    res.json({
      message: 'Update brand successfully',
      data,
    });
  });
};

export const listBrandsRelated = (req, res) => {
  Brand.find({
    _id: { $ne: req.brand },
  }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: 'Brands not found!',
      });
    }
    res.json({ data });
  });
};
