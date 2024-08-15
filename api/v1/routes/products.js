const express = require("express");
const router = express.Router();

const Controller = require("../controllers/products");

router.get("/", Controller.index);

router.post("/create", Controller.create);

router.patch("/change-status/:id", Controller.changeStatus);

router.patch("/change-multi", Controller.changeMulti);

module.exports = router;
