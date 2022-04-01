import jwt from "jsonwebtoken";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const User = require("../models/userModel");
const expressJwt = require("express-jwt");
export const tokenList = {};

// use for login with google, facebook
export const Login = async (req, res, next) => {
	const { uid, name, email, phoneNumber, photoURL, verify } = req.body;
	if (!uid) {
		return res.status(400).json({
			message: "uid is required",
		});
	}
	User.findOne({ uid }, async (err, user) => {
		if (err) {
			return res.status(500).json({
				message: "Internal Server Error",
			});
		}

		const expires = "36000s";
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
				expiresIn: "20d",
			}
		);

		tokenList[refreshToken] = user;

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
				res.json({ user, token });
			} catch (error) {
				throw error;
			}
			return;
		}
		res.json({ user, token });
	});
};
