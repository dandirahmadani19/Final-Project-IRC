const express = require("express");
const cors = require("cors");
const errorsHandler = require("./middlewares/errorHandler");
const app = express();
const routes = require("./service/routers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.get("/", (req, res) => {
  res.send("Final Project IRC");
});

app.use(errorsHandler);

module.exports = app;
