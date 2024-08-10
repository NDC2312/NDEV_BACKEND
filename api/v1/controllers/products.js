const generateString = require("../../../Helper/generate.helper");
const Products = require("../models/products.model");

// [GET] api/v1/products
module.exports.index = async (req, res) => {
  const products = await Products.find({
    deleted: false,
    status: "active",
  });
  res.json(products);
  // console.log(products);
};

// [POST] api/v1/products/create
module.exports.create = async (req, res) => {
  console.log(req.body);
  const product = new Products(req.body);
  try {
    await product.save();
    res.json({
      code: 200,
      message: "Tao san pham thanh cong",
      product: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
