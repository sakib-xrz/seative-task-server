const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");
const AuthService = require("../service/auth.service.js");

const register = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;

  const result = await AuthService.handleRegister(registerData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Registration successful",
    data: {
      access: result.token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.handleLogin(loginData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      access: result.token,
    },
  });
});

const AuthController = {
  register,
  login,
};

module.exports = AuthController;
