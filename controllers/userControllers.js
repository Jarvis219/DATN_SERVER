import User from '../models/userModel';
import _ from 'lodash';

export const listUser = (req, res) => {
  User.find()
    .sort({
      updatedAt: -1,
    })
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const userId = (req, res, next, id) => {
  User.findById(id).exec((err, data) => {
    if (err) {
      return res.status(500).json({ Error: err });
    }
    req.user = data;
    next();
  });
};

export const readUser = (req, res) => {
  return res.json(req.user);
};

export const removeUser = (req, res) => {
  let user = req.user;
  user.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete User failure',
      });
    }
    res.json({
      message: 'Delete user successfully',
    });
  });
};

export const updateUser = (req, res) => {
  let user = req.user;
  user = _.assignIn(user, req.body);

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update User successfully',
    });
  });
};

export const searchUser = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let user = req.query.user ? req.query.user : '';
  User.find({
    name: {
      $regex: `${user}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'User not found',
        });
      }
      res.json({ data });
    });
};
