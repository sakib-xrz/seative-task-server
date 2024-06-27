const express = require("express");

const TaskController = require("../../controller/task.controller.js");

const authGuard = require("../../middleware/authGuard.js");

const taskRoutes = express.Router();

taskRoutes.post("/", authGuard(), TaskController.createTask);

taskRoutes.get("/", authGuard(), TaskController.getTasks);

taskRoutes.get("/:taskId", authGuard(), TaskController.getSingleTask);

taskRoutes.patch("/:taskId", authGuard(), TaskController.editTask);

taskRoutes.delete("/:taskId", authGuard(), TaskController.deleteTask);

taskRoutes.post(
  "/generate-fake-tasks",
  authGuard(),
  TaskController.generateFakeTasks
);

module.exports = taskRoutes;
