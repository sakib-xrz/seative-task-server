const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");

const TaskService = require("../service/task.service.js");

const { faker } = require("@faker-js/faker");

const createTask = catchAsync(async (req, res) => {
  const { ...taskData } = req.body;
  const { user } = req.user;

  const result = await TaskService.handleCreateTask(taskData, user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: {
      task: result.task,
    },
  });
});

const getTasks = catchAsync(async (req, res) => {
  const { priority, status, duration, deadline, search, sortBy, order } =
    req.query;

  // Create filters object
  const filters = {
    ...(priority && { priority }),
    ...(status && { status }),
    ...(duration && { duration: { $lte: duration } }),
    ...(deadline && { due_date: { $lte: new Date(deadline) } }),
    ...(search && { title: { $regex: search, $options: "i" } }),
  };

  const result = await TaskService.handleGetTasks(filters, sortBy, order);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  const result = await TaskService.handleGetSingleTask(taskId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task retrieved successfully",
    data: {
      task: result.task,
    },
  });
});

const editTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { ...taskData } = req.body;
  const { user } = req.user;

  const result = await TaskService.handleEditTask(taskId, taskData, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task edited successfully",
    data: {
      task: result.task,
    },
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  await TaskService.handleDeleteTask(taskId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully",
  });
});

const generateFakeTasks = catchAsync(async (req, res) => {
  const { ...taskData } = req.body;
  const { user } = req.user;

  const result = await TaskService.handleGenerateFakeTasks(taskData, user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: `${result.tasks.length} fake tasks created successfully`,
    data: {
      tasks: result.tasks,
    },
  });
});

const taskController = {
  createTask,
  getTasks,
  getSingleTask,
  editTask,
  deleteTask,
  generateFakeTasks,
};

module.exports = taskController;
