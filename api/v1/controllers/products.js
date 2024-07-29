const Products = require("../models/task.model");

// [GET] api/v1/products
module.exports.index = async (req, res) => {
  const products = await Products.find({
    deleted: false,
    status: "active",
  });
  res.json(products);
};
