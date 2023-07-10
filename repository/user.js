const db = require("../database/db");

exports.find = async (id, email) => {
	return (
		await db.query(`SELECT * FROM users WHERE id=${id} or email='${email}';`)
	).rows[0];
};

exports.create = async (user) => {
	await db.query(
		`INSERT INTO users (email, password, username) values ('${user.email}', '${user.password}', '${user.username}');`
	);

	return (await db.query(`SELECT * FROM users WHERE email='${user.email}'`))
		.rows[0];
};

exports.update = async (user) => {
	await db.query(
		`UPDATE users SET password='${user.password}' WHERE email='${user.email}'`
	);

	return (await db.query(`SELECT * FROM users WHERE email='${user.email}'`))
		.rows[0];
};
