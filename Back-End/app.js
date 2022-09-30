/* eslint-disable no-undef */
const express = require("express");
const app = express();
const path = require("path");

const Database = require("./clients/db");
const db = new Database();
db.connect();

const router = require("./routers/router");

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", router);

module.exports = app;
