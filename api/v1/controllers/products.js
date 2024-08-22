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

  res.json({ products: products, countTotalPage: countProducts });
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

// [PATCH] api/v1/products/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    await Products.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhập trạng thái thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhập thất bại.",
    });
  }
};

// [PATCH] api/v1/products/change-multi/
module.exports.changeMulti = async (req, res) => {
  const { ids, type, value } = req.body;

  switch (type) {
    case "status":
      await Products.updateMany(
        {
          _id: { $in: ids },
        },
        { status: value }
      );
      res.json({
        code: 200,
        message: `Đã cập nhập trạng thái thành công ${ids.length} sản phẩm.`,
      });
      break;
    case "delete":
      await Products.updateMany(
        {
          _id: { $in: ids },
        },
        {
          deletedAt: new Date(),
          deleted: true,
        }
      );
      res.json({
        code: 200,
        message: `Đã xóa thành công ${ids.length} sản phẩm.`,
      });
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Products.updateOne(
          {
            _id: id,
          },
          {
            position: position,
          }
        );
      }
      res.json({
        code: 200,
        message: `Đã cập nhập thành công vị trí của ${ids.length} sản phẩm.`,
      });
      break;

    default:
      res.json({
        code: 400,
        message: "Cập nhập thất bại.",
      });
      break;
  }
};

// [GET] api/v1/products/detail
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };

    await Products.findOne(find);
    res.json({
      code: 200,
      message: "Chi tiết sản phẩm",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tìm thấy sản phẩm",
    });
  }
};
