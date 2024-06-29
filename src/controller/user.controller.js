const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");

const UserService = require("../service/user.service.js");

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.handleGetAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: { users: result.users },
  });
});

const UserController = { getAllUsers };

module.exports = UserController;
