const express = require("express");
const router = express.Router();

const Controller = require("../controllers/products");

router.get("/", Controller.index);

router.post("/create", Controller.create);

module.exports = router;
