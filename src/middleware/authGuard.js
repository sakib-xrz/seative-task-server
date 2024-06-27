const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const ApiError = require("../error/ApiError.js");
const User = require("../model/user.model.js");

const authGuard = () => {
  return async (req, _res, next) => {
    try {
      // Get token from request headers, ensuring 'Authorization' is present
      const bearerToken = req.headers.authorization;
      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        throw new ApiError(401, "Invalid or missing authorization header");
      }

      // Extract token from bearer token
      const token = bearerToken.split(" ")[1]; // Fix: Handle cases with extra spaces

      const secret = config.jwtSecret;

      // Verify token
      const decoded = jwt.verify(token, secret);
      req.user = decoded;

      const user = await User.findById(decoded._id);

      if (!user) {
        throw new ApiError(401, "You are not authorized to access this route");
      }

      next();
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  };
};

module.exports = authGuard;
