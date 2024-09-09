const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/", auth.requireAuth, controller.index);

router.get("/detail/:id", auth.requireAuth, controller.detail);

router.patch("/edit/:id", auth.requireAuth, controller.edit);

router.patch("/delete/:id", auth.requireAuth, controller.delete);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

module.exports = router;
