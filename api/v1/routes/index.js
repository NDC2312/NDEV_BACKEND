const Products = require("./products");
const ProductCategory = require("./products-category.route");
const Blog = require("./blog.route");
const Account = require("./account.route");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/products", Products);
  app.use(version + "/products-category", ProductCategory);
  app.use(version + "/blog", Blog);
  app.use(version + "/account", Account);
};
