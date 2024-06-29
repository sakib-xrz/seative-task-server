const User = require("../model/user.model.js");

const handleGetAllUsers = async () => {
  const users = await User.find().select("name email profile_picture");

  return { users };
};

const UserService = { handleGetAllUsers };

module.exports = UserService;
