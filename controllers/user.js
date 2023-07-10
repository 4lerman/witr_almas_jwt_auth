const userService = require("../services/user");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { email, password, username } = req.body;

	const user = await userService.get(null, email);
	if (user !== undefined)
		throw { status: 400, message: "This user already exists" };
	const newUser = await userService.create(email, username, password);
	res.cookie("accessToken", newUser.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: true,
	});
	res.cookie("refreshToken", newUser.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.status(200).json(newUser);
};

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { email, password } = req.body;
	const user = await userService.login(email, password);
	res.cookie("accessToken", user.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: true,
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.status(200).json(user);
};

exports.logout = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { refreshToken } = req.cookies;

	const token = await userService.logout(refreshToken);
	res.clearCookie("refreshToken");
	res.clearCookie("accessToken");
	res.status(200).json(token);
};

exports.refresh = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { refreshToken } = req.cookies;

	const user = await userService.refresh(refreshToken);
	res.cookie("accessToken", user.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: true,
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.status(200).json(user);
};

exports.getById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const id = req.params.id;
	const user = await userService.get(id, null);
	delete user.password;
	res.status(200).json(user);
};
