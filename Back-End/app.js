const express = require("express");
const app = express();

const Database = require("./clients/db");
const db = new Database();
db.connect();

const router = require("./routers/router");

app.use("/api", router);

module.exports = app;
