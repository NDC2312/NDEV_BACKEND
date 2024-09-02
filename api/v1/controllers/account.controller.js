const Account = require("../models/account.model");
const generateHeper = require("../../../Helper/generate.helper");
const md5 = require("md5");

// [GET] api/v1/account
module.exports.index = async (req, res) => {
  const account = await Account.find({
    deleted: false,
  }).select("-password");
  res.json(account);
};

// [POST] api/v1/account/register
module.exports.register = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  console.log(user);

  if (user) {
    res.json({
      code: 400,
      message: "Email này đã tồn tại",
    });
  } else {
    const account = new Account({
      fullName: req.body.fullName,
      email: email,
      password: password,
      token: generateHeper.generateString(20),
      avatar: req.body.avatar,
      role_id: req.body.role_id,
      phone: req.body.phone,
      status: req.body.status,
    });

    await account.save();

    const token = account.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công.",
      token: token,
    });
  }
};

// [POST] api/v1/account/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email này không tồn tại",
    });
    return;
  }

  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Mật khẩu không chính xác.",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công.",
    token: token,
  });
};
