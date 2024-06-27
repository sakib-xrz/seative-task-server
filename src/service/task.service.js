const { faker } = require("@faker-js/faker");

const ApiError = require("../error/ApiError.js");

const Task = require("../model/task.model.js");

const handleCreateTask = async (taskData, user) => {
  if (!taskData?.title) {
    throw new ApiError(400, "Title is required");
  }

  const newTask = await Task.create({
    title: taskData.title,
    description: taskData?.description,
    creator: user?._id,
    assigns: taskData?.assigns || [],
    status: taskData?.status || "todo",
    priority: taskData?.priority || "low",
    duration: taskData?.duration || 0,
    // due_date: taskData?.due_date || Date.now(),
    due_date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  });

  return {
    task: newTask,
  };
};

const handleGetTasks = async (filters, sortBy = "due_date", order = "asc") => {
  const sortOptions = {};

  const prioritySortOrder = {
    low: 1,
    medium: 2,
    high: 3,
  };

  if (sortBy === "priority") {
    sortOptions["priority"] = order === "asc" ? 1 : -1;
  } else {
    sortOptions[sortBy] = order === "desc" ? -1 : 1;
  }

  const tasks = await Task.find(filters).sort(sortOptions);

  if (sortBy === "priority") {
    tasks.sort((a, b) => {
      return (
        (order === "asc" ? 1 : -1) *
        (prioritySortOrder[a.priority] - prioritySortOrder[b.priority])
      );
    });
  }

  return {
    meta: {
      total: tasks.length,
    },
    data: tasks,
  };
};

const handleGetSingleTask = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return {
    task,
  };
};

const handleEditTask = async (taskId, taskData, user) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      title: taskData?.title || task.title,
      description: taskData?.description || task.description,
      creator: task.creator,
      assigns: taskData?.assigns || task.assigns,
      status: taskData?.status || task.status,
      priority: taskData?.priority || task.priority,
      duration: taskData?.duration || task.duration,
      due_date: taskData?.due_date || task.due_date,
    },
    { new: true }
  );

  return {
    task: updatedTask,
  };
};

const handleDeleteTask = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await Task.findByIdAndDelete(taskId);

  return;
};

const handleGenerateFakeTasks = async (taskData, user) => {
  const count = taskData?.count || 10;
  const tasks = [];
  for (let i = 0; i < count; i++) {
    const fakeTaskData = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      assigns: [],
      status: faker.helpers.arrayElement(["todo", "in-progress", "completed"]),
      priority: faker.helpers.arrayElement(["high", "medium", "low"]),
      duration: faker.number.int({ min: 1, max: 10 }),
      due_date: faker.date.future(),
    };

    const result = await handleCreateTask(fakeTaskData, user);
    tasks.push(result.task);
  }
  return {
    tasks,
  };
};

const TaskService = {
  handleCreateTask,
  handleGetTasks,
  handleGetSingleTask,
  handleEditTask,
  handleDeleteTask,
  handleGenerateFakeTasks,
};

module.exports = TaskService;
