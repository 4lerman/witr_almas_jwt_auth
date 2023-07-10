const redis_db = require("../database/redis_db");
require("dotenv").config();

exports.get = async (uuid_key) => {
	const user_id = await redis_db.get(uuid_key, (err, res) => {
		if (res === 1) return user_id;
		else return { status: 500, message: "error occured while getting" };
	});
	return user_id;
};

exports.create = async (user_id, uuid_key) => {
	await redis_db.set(
		uuid_key,
		user_id,
		"EX",
		process.env.RESET_PASSWORD_TIME,
		(err, res) => {
			console.log(typeof process.env.RESET_PASSWORD_TIME)
			if (res === 1) return { status: 200, message: "created successfully" };
			else return { status: 500, message: "error occured while creating" };
		}
	);
};

exports.delete = async (uuid_key) => {
	await redis_db.del(uuid_key, (err, res) => {
		if (res === 1) return { status: 200, message: "deleted successfully" };
		else return { status: 500, message: "error occured while deleting" };
	});
};
