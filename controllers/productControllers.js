import Product from "../models/productModel";
import _ from "lodash";

export const listProduct = (req, res) => {
  Product.find()
    .sort({
      updatedAt: -1,
    })
    .populate([{ path: "category_id" }, { path: "brand_id" }])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ data });
    });
};

export const createProduct = async (req, res) => {
  const product = await new Product(req.body);
  try {
    const dataProduct = await product.save();
    const data = await dataProduct.populate([
      { path: "category_id" },
      { path: "brand_id" },
    ]);
    return res.status(200).json({
      message: "Create product successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Add failed!",
    });
  }

  // product.save((err, data) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     });
  //   }
  //   res.json({
  //     data,
  //     message: 'Create product successfully',
  //   });
  // });
};

export const productId = (req, res, next, id) => {
  Product.findById(id)
    .populate([{ path: "category_id" }, { path: "brand_id" }])
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({
          error: err,
        });
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
  product.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete product failure",
      });
    }
    res.status(200).json({
      message: "Delete product successfully",
      data,
    });
  });
};

export const updateProduct = async (req, res) => {
  let product = req.product;
  product = _.assignIn(product, req.body);

  try {
    const dataProduct = await product.save();
    const data = await dataProduct.populate([
      { path: "category_id" },
      { path: "brand_id" },
    ]);
    return res.status(200).json({
      message: "Update successfully!",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Update failed!",
    });
  }
};

export const listProductRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 5;
  Product.find({
    _id: { $ne: req.product }, // loại trừ
    category_id: req.product.category_id, // lấy theo thể loại
  })
    .limit(limit)
    .populate([{ path: "category_id" }, { path: "brand_id" }])
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
  let name = req.query.name ? req.query.name : "";
  Product.find({
    product_name: {
      $regex: `${name}`,
      $options: "$i",
    },
  })
    .limit(limit)
    .populate([{ path: "category_id" }, { path: "brand_id" }])
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      res.json({ data });
    });
};

export const filter_category_brand = (req, res) => {
  let category = req.query.category ? req.query.category : "";
  let brand = req.query.brand ? req.query.brand : "";
  const ObjectId = require("mongodb").ObjectId;
  const idCategory = new ObjectId(category);
  const idBrand = new ObjectId(brand);
  Product.find({
    category_id: idCategory,
    brand_id: idBrand,
  })
    .populate([{ path: "category_id" }, { path: "brand_id" }])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          err,
          error: "Data does not exist",
        });
      }
      res.status(200).json({ data });
    });
};
