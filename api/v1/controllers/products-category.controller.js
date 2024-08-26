const ProductCategory = require("../models/products-category.model");
const createTreeHelper = require("../../../Helper/createTree.helper");

// [GET] api/v1/products-category/
module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };
    const product = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(product);
    res.json(newRecords);
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại.",
    });
  }
};

// [POST] api/v1/products-category/create
module.exports.create = async (req, res) => {
  try {
    if (req.body.position == "") {
      req.body.position = (await ProductCategory.countDocuments()) + 1;
    } else req.body.position = req.body.position;
    const product = await new ProductCategory(req.body);
    await product.save();
    res.json({
      code: 200,
      message: "Tạo sản phẩm thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo sản phẩm thất bại.",
    });
  }
};

// [PATCH] api/v1/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    await ProductCategory.updateOne({ _id: id }, req.body);
    res.json({
      code: 200,
      message: "Cập nhật danh mục sản phẩm thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại.",
    });
  }
};

// [GET] api/v1/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductCategory.findOne({ _id: id });
    res.json(product);
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại.",
    });
  }
};

// [PATCH] api/v1/products-category/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductCategory.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
      }
    );
    res.json({
      code: 200,
      message: "Xóa sản phẩm thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa thất bại.",
    });
  }
};

// [PATCH] api/v1/products-category/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const value = req.body.status;
    await ProductCategory.updateOne(
      {
        _id: id,
      },
      {
        status: value,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thay đổi trạng thái thất bại.",
    });
  }
};

// [PATCH] api/v1/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;
    console.log(ids);
    switch (key) {
      case "change-status":
        await ProductCategory.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: `cập nhật thành công ${ids.length} sản phẩm. `,
        });
        break;

      case "deleteAll":
        await ProductCategory.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
          }
        );
        res.json({
          code: 200,
          message: `Xóa thành công ${ids.length} sản phẩm. `,
        });
        break;

      case "change-position":
        for (const item of ids) {
          const [id, position] = item.split("-");
          parseInt(position);
          await ProductCategory.updateOne(
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
          message: `Cập nhật thành công ${ids.length} vị trí sản phẩm.`,
        });
        break;

      default:
        res.json({
          code: 400,
          message: `Cập nhật thất bại ${ids.length}`,
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại.",
    });
  }
};
