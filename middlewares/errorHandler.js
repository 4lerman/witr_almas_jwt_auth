exports.errorHandler = (err, req, res, next) => {
	const status = err.status;
	if (status !== undefined) {
		delete err.status;
		res.status(status).json(err.message);
		return;
	}
	console.log(err);
	res.status(500).json({ err: "Something went wrong" });
};
