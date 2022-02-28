import DetailInvoice from '../models/detailInvoiceModel';
import _ from 'lodash';

export const listDetailInvoice = (req, res) => {
  DetailInvoice.find().exec((err, data) => {
    if (err) {
      return res.status(500).json({
        error: 'DetailInvoice not found!',
      });
    }
    res.status(200).json({ data });
  });
};

export const createDetailInvoice = (req, res) => {
  const detailInvoice = new DetailInvoice(req.body);
  detailInvoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add detail invoice failed!',
      });
    }
    res.json({
      data,
      message: 'Create detail invoice successfully',
    });
  });
};

export const detailInvoiceId = (req, res, next, id) => {
  DetailInvoice.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: 'Detail invoice not found!',
      });
    }
    req.detailInvoice = data;
    next();
  });
};

export const readDetailInvoice = (req, res) => {
  return res.json(req.detailInvoice);
};

export const removeDetailInvoice = (req, res) => {
  let detailInvoice = req.detailInvoice;
  detailInvoice.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete detail invoice failed!',
      });
    }
    res.json({
      message: 'Delete detail invoice successfully',
      data,
    });
  });
};

export const updateDetailInvoice = (req, res) => {
  let detailInvoice = req.detailInvoice;
  detailInvoice = _.assignIn(detailInvoice, req.body);
  detailInvoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update detail Invoice failed!',
      });
    }
    res.json({
      message: 'Update detail invoice successfully',
      data,
    });
  });
};
