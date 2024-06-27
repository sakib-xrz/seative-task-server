const ApiError = require("../error/ApiError.js");

const User = require("../model/user.model.js");

const handelGetMe = async (user) => {
  const foundUser = await User.findById(user._id).select("-password");

  if (!foundUser) {
    throw new ApiError(404, "User not found");
  }

  return foundUser;
};

const MeService = {
  handelGetMe,
};

module.exports = MeService;
