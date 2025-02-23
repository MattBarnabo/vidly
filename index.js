const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const authenticator = require("./middleware/authenticator");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/genres", genres);
app.use("/", home);

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	debug("Morgan enabled...");
}

app.use(logger);
app.use(authenticator);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
