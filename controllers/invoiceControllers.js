import Invoice from '../models/invoiceModel';
import _ from 'lodash';

export const listInvoice = (req, res) => {
  Invoice.find().exec((err, data) => {
    if (err) {
      return res.status(500).json({
        error: 'Invoice not found!',
      });
    }
    res.status(200).json({ data });
  });
};

export const createInvoice = (req, res) => {
  const invoice = new Invoice(req.body);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add invoice failed!',
      });
    }
    res.json({
      data,
      message: 'Create invoice successfully',
    });
  });
};

export const invoiceId = (req, res, next, id) => {
  Invoice.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: 'Invoice not found!',
      });
    }
    req.invoice = data;
    next();
  });
};

export const readInvoice = (req, res) => {
  return res.json(req.invoice);
};

export const removeInvoice = (req, res) => {
  let invoice = req.invoice;
  invoice.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete invoice failed!',
      });
    }
    res.json({
      message: 'Delete invoice successfully',
      data,
    });
  });
};

export const updateInvoice = (req, res) => {
  let invoice = req.invoice;
  invoice = _.assignIn(invoice, req.body);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update invoice failed!',
      });
    }
    res.json({
      message: 'Update invoice successfully',
      data,
    });
  });
};

export const listInvoiceRelated = (req, res) => {
  Invoice.find({
    invoice_id: { $ne: req.invoice },
  }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: 'Invoice not found!',
      });
    }
    res.json({ data });
  });
};
