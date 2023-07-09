const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const db = require('./database/db');
require("dotenv").config();

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

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port - ${PORT}`));
