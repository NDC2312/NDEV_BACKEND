const Role = require("../models/role.model");

// [GET] api/v1/role
module.exports.index = async (req, res) => {
  try {
    const find = { deleted: false };
    const role = await Role.find(find);
    res.json(role);
  } catch (error) {
    res.json({
      code: 400,
      message: "Lấy thông tin nhóm quyền thất bại",
    });
  }
};

// [POST] api/v1/role/create
module.exports.create = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.json({
      code: 200,
      message: "Tạo nhóm quyền thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại khi tạo nhóm quyền",
    });
  }
};
