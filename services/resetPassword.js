const userService = require("./user");
const redisRespository = require("../repository/redis");
const uuid = require("uuid");
const { sendEmail } = require("./sendEmail");

exports.reset = async (email) => {
	const user = await userService.get(null, email);
	if (!user) throw { status: 404, message: "User not found" };

	const uuid_key = uuid.v4().toString().replace(/-/g, "");
	await redisRespository.create(user.id, uuid_key);

	const resetLink = `http://localhost:5000/api/user/reset_password/confirm/${uuid_key}`;
	sendEmail({
		to: user.email,
		subject: "Password Reset",
		text: `Hi ${user.username}, here's your password reset link: ${resetLink}. 
        If you did not request this link, ignore it.`,
	});
	console.log(resetLink);
};

exports.resetConfirmation = async (uuid, newPassword) => {
	const resetting_user_id = await redisRespository.get(uuid);
	const user = await userService.get(resetting_user_id, null);

	const updatedUser = await userService.update(user.email, newPassword);
    await redisRespository.delete(uuid);
	sendEmail({
		to: user.email,
		subject: "Password Reset Successful",
		text: `Congratulations ${user.username}! Your password reset was successful.`,
	});
	return updatedUser;
};
