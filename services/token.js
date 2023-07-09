const jwt = require("jsonwebtoken");
const TokenRepository = require("../repository/token");
require("dotenv").config();

exports.generateToken = async (payload) => {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "5min",
	});
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
	return { accessToken, refreshToken };
};

exports.saveToken = async (id, refreshToken) => {
	const tokenData = await TokenRepository.find(id, null);
	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		TokenRepository.save(tokenData);
		return;
	}
	await TokenRepository.create(id, refreshToken);
};

exports.removeToken = async (refreshToken) => {
	return await TokenRepository.delete(refreshToken);
};

exports.validateAToken = async (accessToken) => {
	try {
		return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
	} catch {
		throw { status: 401, message: "User is unauthorized" };
	}
};

exports.validateRToken = async (refreshToken) => {
	try {
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const token = await TokenRepository.find(null, refreshToken);
		if (token && user) return user;
	} catch {
		throw { status: 401, message: "User is unauthorized: please login again" };
	}
};