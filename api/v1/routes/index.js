const Products = require("./products");
const ProductCategory = require("./products-category.route");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/products", Products);
  app.use(version + "/products-category", ProductCategory);
};
