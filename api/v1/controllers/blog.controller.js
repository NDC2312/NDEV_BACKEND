const Blog = require("../models/blog.model");

// [GET] api/v1/blog
module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };
    const blog = await Blog.find(find);
    res.json(blog);
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại.",
    });
  }
};

// [POST] api/v1/blog/create
module.exports.create = async (req, res) => {
  try {
    if (req.body.position == "") {
      req.body.position = (await Blog.countDocuments()) + 1;
    } else req.body.position = req.body.position;
    const blog = await new Blog(req.body);
    blog.save();
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

// [PATCH] api/v1/blog/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    await Blog.updateOne(find, req.body);
    res.json({
      code: 200,
      message: "Cập nhật bài viết thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật bài viết thất bại.",
    });
  }
};

// [GET] api/v1/blog/detail/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const blog = await Blog.findOne(find);
    res.json(blog);
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi.",
    });
  }
};

// [PATCH] api/v1/blog/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    await Blog.updateOne(find, {
      deleted: true,
    });
    res.json({
      code: 200,
      message: "Xóa bài viết thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa thất bại .",
    });
  }
};

// [PATCH] api/v1/blog/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    let find = {
      _id: id,
      deleted: false,
    };
    await Blog.updateOne(find, {
      status: status,
    });
    res.json({
      code: 200,
      message: "Thay đổi trạng thái thành công.",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thay đổi trạng thái thất bại.",
    });
  }
};

// // [PATCH] api/v1/blog/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "change-status":
        await Blog.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: `Thay đổi trạng thái thành công ${ids.length} bài viết`,
        });
        break;
      case "deleteAll":
        await Blog.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
          }
        );
        res.json({
          code: 200,
          message: `Xóa thành công ${ids.length} bài viết`,
        });
        break;
      case "change-position":
        for (const item of ids) {
          let [id, position] = item.split("-");
          position = parent(position);
          await Blog.updateOne(
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
          message: `Thay đổi thành công ${ids.length} vị trí bài viết`,
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Thất bại.",
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
