const Products = require("./products");
const ProductCategory = require("./products-category.route");
const Blog = require("./blog.route");
const Account = require("./account.route");
const Role = require("./role.route");
const requireAuth = require("../middlewares/auth.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", requireAuth.requireAuth, Products);

  app.use(
    version + "/products-category",
    requireAuth.requireAuth,
    ProductCategory
  );

  app.use(version + "/blog", requireAuth.requireAuth, Blog);

  app.use(version + "/account", Account);

  app.use(version + "/role", requireAuth.requireAuth, Role);
};
