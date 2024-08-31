const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/", auth.requireAuth, controller.index);

module.exports = router;
