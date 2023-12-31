const userRepository = require("../repository/user");
const bcrypt = require("bcrypt");
const tokenService = require("./token");

exports.get = async (id, email) => {
	return userRepository.find(id, email);
};

exports.create = async (email, username, password) => {
	const hash = await bcrypt.hash(password, 10);

	const user = await userRepository.create({ email, username, password: hash });
	delete user.password;
	const tokens = await tokenService.generateToken(user);
	await tokenService.saveToken(user.id, tokens.refreshToken);
	return { ...tokens, user };
};

exports.update = async (email, password) => {
	const hash = await bcrypt.hash(password, 10);

	const user = await userRepository.update({email, password: hash});
	delete user.hash;

	return user;
}

exports.login = async (email, password) => {
	const user = await userRepository.find(null, email);
	if (!user) throw { status: 404, message: "user not found" };

	const isEqual = await bcrypt.compare(password, user.password);
	if (!isEqual)
		throw { status: 400, message: "Info does not match. Try again" };

	delete user.password;
	const tokens = await tokenService.generateToken(user);
	await tokenService.saveToken(user.id, tokens.refreshToken);
	return { ...tokens, user };
};

exports.logout = async (refreshToken) => {
	return await tokenService.removeToken(refreshToken);
};

exports.refresh = async (refreshToken) => {
	if (!refreshToken) throw { status: 401, message: "User is unaurthorized" };

	const token = await tokenService.validateRToken(refreshToken);
	if (!refreshToken)
		throw { status: 401, message: "User is unaurthorized to refresh" };

	const user = await userRepository.find(token.id, null);
    delete user.password;
	const tokens = await tokenService.generateToken(user);
	await tokenService.saveToken(user.id, tokens.refreshToken);
	return { ...tokens, user };
};
