const express = require("express");
const UserController = require("../../controller/user.controller.js");
const authGuard = require("../../middleware/authGuard.js");

const userRoutes = express.Router();

userRoutes.get("/", authGuard(), UserController.getAllUsers);

module.exports = userRoutes;
