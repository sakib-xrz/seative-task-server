const express = require("express");
const AuthController = require("../../controller/auth.controller.js");

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);

authRoutes.post("/login", AuthController.login);

module.exports = authRoutes;
