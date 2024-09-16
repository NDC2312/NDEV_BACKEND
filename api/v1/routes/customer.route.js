const express = require("express");
const router = express.Router();

const controller = require("../controllers/customer.controller");

router.get("/", controller.index);

router.post("/create", controller.create);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/delete/:id", controller.delete);

module.exports = router;
