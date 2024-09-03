const express = require("express");
const router = express.Router();

const controller = require("../controllers/role.controller");

router.get("/", controller.index);

router.post("/create", controller.create);

router.patch("/permissions", controller.permissions);

module.exports = router;
