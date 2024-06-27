const express = require("express");
const MeController = require("../../controller/me.controller.js");
const authGuard = require("../../middleware/authGuard.js");

const meRoutes = express.Router();

meRoutes.get("/", authGuard(), MeController.getMe);

module.exports = meRoutes;
