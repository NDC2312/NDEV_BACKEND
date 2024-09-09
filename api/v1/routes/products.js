const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/auth.middleware");

const Controller = require("../controllers/products");

router.get("/", requireAuth.checkPermission("products-view"), Controller.index);

router.post(
  "/create",
  requireAuth.checkPermission("products-create"),
  Controller.create
);

router.patch("/change-status/:id", Controller.changeStatus);

router.patch("/change-multi", Controller.changeMulti);

router.get(
  "/detail/:id",
  requireAuth.checkPermission("products-detail"),
  Controller.detail
);

router.patch(
  "/edit/:id",
  requireAuth.checkPermission("products-edit"),
  Controller.edit
);

router.patch(
  "/delete/:id",
  requireAuth.checkPermission("products-delete"),
  Controller.delete
);

module.exports = router;
