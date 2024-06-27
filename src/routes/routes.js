const express = require("express");
const authRoutes = require("../api/auth/index.js");
const meRoutes = require("../api/me/index.js");
const taskRoutes = require("../api/task/index.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/me", meRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
