import Evaluate from "../models/evaluateModel";
import _ from "lodash";

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
    res.json(data);
  });
};
