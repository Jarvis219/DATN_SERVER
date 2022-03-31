import jwt from "jsonwebtoken";
export const authToken = (req, res, next) => {
	const authorizationHeader = req.headers["authorization"];
	const token = authorizationHeader.split(" ")[1];
	// next();
	if (!token) {
		return res.status(401).json({
			error: "token not match",
		});
	}
	next();
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

export const isAuth = (req, res, next) => {
	let user = req.profile;
	if (!user) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.permission !== 0) {
		return res.status(403).json({
			error: "Admin resource! Access Denied",
		});
	}
	next();
};
