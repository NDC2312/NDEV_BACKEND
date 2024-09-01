const Account = require("../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = await Account.findOne({
      token: token,
      deleted: false,
    }).select("-password");

    if (!user) {
      res.json({
        code: 400,
        message: "Vui lòng gửi kèm theo token",
      });
      return;
    }
    req.user = user; // thac mac
    next();
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi theo kèm token.",
    });
  }
};
