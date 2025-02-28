const app = require("./src/app.js");
const { config } = require("./src/config/config.js");
const connectDB = require("./src/config/db.js");
const checkOverdueTasks = require("./src/utils/cronJob.js");

const startServer = async () => {
  // Connect database
  await connectDB();
  checkOverdueTasks();

  const port = config.port || 8000;

  app.listen(port, () => {
    console.log(`🎯 Server listening on port: ${port}`);
  });
};

startServer();
