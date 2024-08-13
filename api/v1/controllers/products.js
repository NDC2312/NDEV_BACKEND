const generateString = require("../../../Helper/generate.helper");
const searchHelpers = require("../../../Helper/search.helper");
const paginationHelpers = require("../../../Helper/pagination.helper");
const Products = require("../models/products.model");

// [GET] api/v1/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else sort.position = "desc";
  // -- end sort --

  // search
  const objectSearch = searchHelpers(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  // -- end search --

  // pagination
  const countProducts = await Products.countDocuments(find);
  const objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitProduct: 4,
    },
    req.query,
    countProducts
  );
  // -- end pagination --

  const products = await Products.find(find)
    .sort(sort)
    .limit(objectPagination.limitProduct)
    .skip(objectPagination.skip);

  res.json(products);
};

// [POST] api/v1/products/create
module.exports.create = async (req, res) => {
  try {
    if (req.body.position == "") {
      const position = await Products.countDocuments();
      req.body.position = position + 1;
    } else {
      req.body.position = req.body.position;
    }
    const product = new Products(req.body);
    await product.save();
    res.json({
      code: 200,
      message: "Tạo sản phẩm thành công",
      product: product,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không thành công!",
    });
  }
};
