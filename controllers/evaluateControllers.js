import Evaluate from "../models/evaluateModel";
import _ from "lodash";
import Product from "../models/productModel";

export const listEvaluates = (req, res) => {
  Evaluate.find()
    .sort({
      updatedAt: -1,
    })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Evaluate not found!",
        });
      }
      res.status(200).json({ data });
    });
};

export const createEvaluate = (req, res) => {
  const evaluate = new Evaluate(req.body);
  evaluate.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Add evaluate failed!",
      });
    }
    getEvaluateByProduct(data.product_id);
    res.json({
      data,
      message: "Create evaluate successfully",
    });
  });
};

export const evaluateId = (req, res, next, id) => {
  Evaluate.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: "Evaluate not found!",
      });
    }
    req.evaluate = data;
    next();
  });
};

export const readEvaluate = (req, res) => {
  return res.json(req.evaluate);
};

export const removeEvaluate = (req, res) => {
  let evaluate = req.evaluate;
  evaluate.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete evaluate failed!",
      });
    }
    res.json({
      message: "Delete evaluate successfully",
      data,
    });
  });
};

export const updateEvaluate = (req, res) => {
  let evaluate = req.evaluate;
  evaluate = _.assignIn(evaluate, req.body);
  evaluate.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update evaluate failed!",
      });
    }
    res.json({
      message: "Update evaluate successfully",
      data,
    });
  });
};

export const listEvaluateByProduct = (req, res) => {
  Evaluate.find({ product_id: req.product._id }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Evaluates not found!",
      });
    }
    res.json({ data });
  });
};

const getEvaluateByProduct = async (id) => {
  const listEvaluates = await Evaluate.find({ product_id: id });

  let averageStar =
    listEvaluates.reduce(
      (previousValue, currentValue) => previousValue + currentValue.star,
      0
    ) / listEvaluates.length;
  averageStar = Math.round(averageStar);
  updateProduct(id, {
    product_star: averageStar,
  });
};
const updateProduct = async (id, data) => {
  let product = await Product.find({ _id: id });
  product[0]["product_star"] = data.product_star;
  product[0].save();
};
