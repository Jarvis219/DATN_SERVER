import jwt from "jsonwebtoken";
import User from "../models/userModel";
const expressJwt = require("express-jwt");
import verifyJwt from "./veryfyJwt";
import { tokenList } from "../controllers/authControllers";

export const authToken = (req, res, next) => {
	const authorizationHeader = req.headers["authorization"];
	const token = authorizationHeader.split(" ")[1];

	if (!token || token === "null") {
		return res.status(401).json({
			error: "token not match",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
		if (err) {
			return res.status(403).json({
				err,
				error: "token expired",
			});
		}
		next();
	});
};

export const requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
	userProperty: "auth",
});

export const isAuth = (req, res, next) => {
	let user = req.auth;
	if (!user) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}
	req.adminId = user._id;
	next();
};

exports.isStaff = (req, res, next) => {
	const _id = req.adminId;
	User.findOne({ _id }).exec((err, data) => {
		if (err) {
			return res.status(401).json({
				err,
			});
		}
		if (data.role >= 0 && data.role < 5) {
			next();
			return;
		}
		return res.status(401).json({
			err: "is not staff",
		});
	});
};

exports.isAdmin = (req, res, next) => {
	const _id = req.adminId;
	User.findOne({ _id }).exec((err, data) => {
		if (err) {
			return res.status(401).json({
				err,
			});
		}
		if (data.role === 0) {
			next();
			return;
		}
		return res.status(401).json({
			err: "is not admin",
		});
	});
};

export const refreshToken = (req, res) => {
	const { refreshToken } = req.body;
	if (refreshToken && refreshToken in tokenList) {
		try {
			verifyJwt.verifyJwtToken(refreshToken, process.env.JWT_REFRESH_TOKEN);

			const user = tokenList[refreshToken];

			const token = jwt.sign(
				{
					_id: user._id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "36000s",
				}
			);
			res.status(200).json({
				token,
			});
		} catch (error) {
			res.status(403).json({
				message: "Invalid refresh token",
			});
		}
	} else {
		res.status(400).json({
			message: "Invalid request",
		});
	}
};
