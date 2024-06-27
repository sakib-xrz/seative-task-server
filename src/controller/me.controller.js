const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");

const MeService = require("../service/me.service.js");

const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await MeService.handelGetMe(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data retrieved",
    data: {
      user: result,
    },
  });
});

const MeController = {
  getMe,
};

module.exports = MeController;
