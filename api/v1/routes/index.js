const Products = require("./products");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/products", Products);
};
