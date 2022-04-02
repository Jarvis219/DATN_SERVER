import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
const User = require('../models/userModel');
const expressJwt = require('express-jwt');
export const tokenList = {};

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
        const data = await user.save();
        const { token, refreshToken, expires } = buildToken(data);
        res.json({ user, token, refreshToken, expires });
      } catch (error) {
        throw error;
      }
      return;
    }
    const { token, refreshToken, expires } = buildToken(user);

    res.json({ user, token, refreshToken, expires });
  });
};

const buildToken = (user) => {
  const expires = '36000s';
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expires,
    }
  );

  // create refreshToken
  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: '20d',
    }
  );

  tokenList[refreshToken] = user;
  return { token, refreshToken, expires };
};
