const cron = require("node-cron");
const sendMail = require("./mailer.js");
const Task = require("../model/task.model.js");

const checkOverdueTasks = async () => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const incompleteTasks = await Task.find({
      status: { $ne: "completed" },
    }).populate("assigns");

    const overdueTasks = incompleteTasks.filter((task) => {
      const dueDate = new Date(task?.due_date);
      return dueDate < today;
    });

    overdueTasks.forEach(async (task) => {
      const assigneeEmails = task.assigns.map((user) => user.email);
      console.log(assigneeEmails);
      const subject = `Task Overdue Reminder`;
      const text = `The task "${task.title}" is overdue. Please take necessary actions.`;

      assigneeEmails.forEach((email) => {
        sendMail(email, subject, text);
      });
    });
  } catch (error) {
    console.error("Error checking overdue tasks:", error);
  }
};

// Schedule the job to run at 12:00 AM every day
cron.schedule("0 0 * * *", checkOverdueTasks);

module.exports = checkOverdueTasks;
