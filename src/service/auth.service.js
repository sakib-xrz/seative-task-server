const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError.js");
const { config } = require("../config/config.js");
const User = require("../model/user.model.js");

const handleRegister = async (registerData) => {
  let { name, email, password } = registerData;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new ApiError(400, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  password = hashedPassword;

  const newUser = await User.create({ name, email, password });

  const payload = {
    _id: newUser._id,
    role: newUser.role,
  };

  const secret = config.jwtSecret;
  const expiresIn = config.jwtExpiresIn;

  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return {
    token,
  };
};

const handleLogin = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "No user found with this email");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new ApiError(401, "Incorrect email or password");
  }

  if (user.status === "suspended") {
    throw new ApiError(401, "Your account has been suspended");
  }

  const payload = {
    _id: user._id,
    role: user.role,
  };

  const secret = config.jwtSecret;
  const expiresIn = config.jwtExpiresIn;

  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return {
    token,
  };
};

const AuthService = {
  handleRegister,
  handleLogin,
};

module.exports = AuthService;
