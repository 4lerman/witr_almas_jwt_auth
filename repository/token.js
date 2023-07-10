const db = require("../database/db");

exports.find = async (id, refreshToken) => {
	return (
		await db.query(
			`SELECT * from refresh_tokens where id=${id} or refreshToken='${refreshToken}'`
		)
	).rows[0];
};

exports.create = async (id, refreshToken) => {
	await db.query(
		`INSERT INTO refresh_tokens (id, refreshToken) values('${id}', '${refreshToken}');`
	);
};

exports.save = async (token) => {
	await db.query(
		`UPDATE refresh_tokens SET refreshToken='${token.refreshToken}' WHERE id=${token.id};`
	);
};

exports.delete = async (refreshToken) => {
	const token = (
		await db.query(
			`SELECT * FROM refresh_tokens where refreshToken='${refreshToken}'`
		)
	).rows[0];

	if (!token) throw { status: 500, error: "token err" };

    await db.query(`DELETE FROM refresh_tokens WHERE id=${token.id}`)
    return token;
};
