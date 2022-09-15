const express = require("express");
const router = express.Router();

const { signupHandler, loginHandler } = require("../handlers/authHandler");

router.post("/auth/signup", (req, res) => {
  signupHandler(req, res);
});

router.post("/auth/login", (req, res) => {
  loginHandler(req, res);
});

module.exports = router;
