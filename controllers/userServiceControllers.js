import UserService from '../models/userServiceModel';
import _ from 'lodash';

export const listUserService = (req, res) => {
  UserService.find()
    .sort({
      updatedAt: -1,
    })
    .populate(
      'staff_id service_id user_id',
      'staff_name user_id star service_name service_price service_sale service_star service_album category_id name photoURL phoneNumber email'
    )
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const userServiceId = (req, res, next, id) => {
  UserService.findById(id)
    .populate(
      'staff_id service_id user_id',
      'staff_name user_id star service_name service_price service_sale service_star service_album category_id name photoURL phoneNumber email'
    )
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      req.userService = data;
      next();
    });
};

export const readUserService = (req, res) => {
  return res.json(req.userService);
};

export const removeUserService = (req, res) => {
  let userService = req.userService;
  userService.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'delete user service failure',
      });
    }
    res.json({
      message: 'Delete user service successfully',
    });
  });
};

export const createUserService = (req, res) => {
  const userService = new UserService(req.body);
  userService.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create user service successfully',
    });
  });
};

export const updateUserService = (req, res) => {
  let userService = req.userService;
  userService = _.assignIn(userService, req.body);

  userService.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update user service successfully',
    });
  });
};
