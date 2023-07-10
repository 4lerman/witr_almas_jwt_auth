const tokenService = require("../services/token");
require("dotenv").config();

exports.verify = async (req, res, next) => {
	const token = req.cookies.accessToken || req.cookies["accessToken"];
	if (!token) {
		return res.status(403).send("Login first");
	}
	try {
		const data = await tokenService.validateAToken(token)
		req.user = data;
		return next();
	} catch {
		return res.status(403).send("Unauthorized");
	}
};
