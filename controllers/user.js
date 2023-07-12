const userService = require("../services/user");
const { validationResult } = require("express-validator");
const resetPassword = require("../services/resetPassword");

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
		httpOnly: false,
		path: '/'
	});
	res.cookie("refreshToken", newUser.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
		path: '/'
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
		httpOnly: false,
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
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
		httpOnly: false,
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
	});
	res.status(200).json(user);
};

exports.getById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const id = req.params.id || req.params["id"];
	const user = await userService.get(id, null);
	delete user.password;
	res.status(200).json(user);
};

exports.resetPasswordReq = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { email } = req.user;

	await resetPassword.reset(email);
	res.status(200).send("check your email for resetting password");
};

exports.resetPasswordConfirm = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };
	//console.log(typeof req.params.uuid || req.params["uuid"]);
	const uuid = req.params.uuid || req.params["uuid"];

	const { newPassword } = req.body;

	const updatedUser = await resetPassword.resetConfirmation(uuid, newPassword);
	delete updatedUser.password;
	res.status(200).json(updatedUser);
};
