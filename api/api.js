const express = require("express");
const api = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

const use = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

api.post("/user/register", use(userController.register));
api.post("/user/login", use(userController.login));
api.get("/user/logout", use(userController.logout));
api.post("/user/refresh", use(userController.refresh));
api.get("/user/:id", auth.verify, use(userController.getById));

module.exports = api;
