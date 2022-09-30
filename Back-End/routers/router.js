/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const { corsAccess } = require("../middlewares/cors");
const { authorization } = require("../middlewares/authorization");
const multer = require("../middlewares/multer");

const { signupHandler, loginHandler } = require("../controllers/authHandler");
const {
  sauceListHandler,
  sauceHandler,
  newSauceHandler,
  sauceUpdateHandler,
  sauceDeleteHandler,
  sauceLikeHandler,
} = require("../controllers/saucesHandler");

router.use(express.json());
router.use(corsAccess);

router.post("/auth/signup", signupHandler);

router.post("/auth/login", loginHandler);

router.get("/sauces", authorization, sauceListHandler);

router.post("/sauces", authorization, multer, newSauceHandler);

router.get("/sauces/:id", authorization, sauceHandler);

router.put("/sauces/:id", authorization, multer, sauceUpdateHandler);

router.delete("/sauces/:id", authorization, sauceDeleteHandler);

router.post("/sauces/:id/like", authorization, sauceLikeHandler);

module.exports = router;
