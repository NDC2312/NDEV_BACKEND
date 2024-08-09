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
  const {
    title,
    product_category_id,
    price,
    discount,
    position,
    featured,
    description,
    status,
  } = req.body;
  const product = new Products({
    title,
    product_category_id,
    price,
    discount,
    position,
    featured,
    description,
    status,
  });
  try {
    await product.save();
    res.json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
