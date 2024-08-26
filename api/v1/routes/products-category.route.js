const express = require("express");
const router = express.Router();

const controller = require("../controllers/products-category.controller");

router.get("/", controller.index);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.get("/detail/:id", controller.detail);

router.patch("/delete/:id", controller.delete);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

module.exports = router;
