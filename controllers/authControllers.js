import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
const User = require('../models/userModel');
const expressJwt = require('express-jwt');

// use for login with google, facebook
export const Login = async (req, res, next) => {
  const { uid, name, email, phoneNumber, photoURL, verify } = req.body;
  if (!uid) {
    return res.status(400).json({
      message: 'uid is required',
    });
  }
  User.findOne({ uid }, async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
    if (!user) {
      const user = new User({
        uid,
        name,
        email,
        phoneNumber,
        photoURL,
        verify,
      });

      try {
        await user.save();
        res.json({ user });
      } catch (error) {
        throw error;
      }
      return;
    }
    res.json({ user });
  });
};
