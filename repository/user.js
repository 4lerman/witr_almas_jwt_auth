const db = require("../database/db");

exports.find = async (id, email) => {
	return (await db.query(`SELECT * FROM user WHERE id=${id} or email=${email}`))
		.rows[0];
};

exports.create = async (user) => {
	await db.query(
		`INSERT INTO user (email, password, username) values ('${user.email}, ${user.password}, ${user.username}');`
	);

	return (await db.query(`SELECT * FROM user WHERE email=${user.email}`)).rows[0];
};
