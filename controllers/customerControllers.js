import Customer from '../models/customerModel';
import _ from 'lodash';

export const listCustomer = (req, res) => {
  Customer.find().exec((err, data) => {
    if (err) {
      return res.status(500).json({
        error: 'Customer not found!',
      });
    }
    res.status(200).json({ data });
  });
};

export const createCustomer = (req, res) => {
  const customer = new Customer(req.body);
  customer.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Add Customer failed!',
      });
    }
    res.json({
      data,
      message: 'Create Customer successfully',
    });
  });
};

export const customerId = (req, res, next, id) => {
  Customer.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: 'Customer not found!',
      });
    }
    req.customer = data;
    next();
  });
};

export const readCustomer = (req, res) => {
  return res.json(req.customer);
};

export const removeCustomer = (req, res) => {
  let customer = req.customer;
  customer.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete customer failed!',
      });
    }
    res.json({
      message: 'Delete customer successfully',
      data,
    });
  });
};

export const updateCustomer = (req, res) => {
  let customer = req.customer;
  customer = _.assignIn(customer, req.body);
  customer.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Update customer failed!',
      });
    }
    res.json({
      message: 'Update customer successfully',
      data,
    });
  });
};

export const listCustomerRelated = (req, res) => {
  Customer.find({
    customer_id: { $ne: req.customer },
  }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: 'Customer not found!',
      });
    }
    res.json({ data });
  });
};
