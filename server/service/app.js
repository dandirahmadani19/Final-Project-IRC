const express = require("express");
const cors = require("cors");
const errorsHandler = require("./middlewares/errorHandler");
const app = express();
const routes = require("./routers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(routes);
app.use(errorsHandler);

module.exports = app;
