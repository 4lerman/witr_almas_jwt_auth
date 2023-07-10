const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const error = require("./middlewares/errorHandler");
const db = require("./database/db");
const redis_db = require("./database/redis_db");
require("dotenv").config();

const api = require("./api/api");

const PORT = process.env.PORT || 8000;

const corsOptions = {
	exposedHeaders: "*",
	origin: `http://localhost:${PORT}`,
	methods: "GET, PUT, POST, DELETE",
	credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", api);
app.use(error.errorHandler);

app.listen(PORT, () => console.log(`Server is running on port - ${PORT}`));
