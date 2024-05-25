const dotenv = require("dotenv");
const app = require("./app");
const { apiLogger } = require("./service/loggerService");
const { databaseService } = require("./service/databaseService");

// Load Environment Variables
dotenv.config(".env");

// Start Server and Database Processes
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  apiLogger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  try {
    await databaseService(process.env.MONGO_URI);
    apiLogger.info(`Connected to MongoDB`);
  } catch (error) {
    apiLogger.error(`Error: ${error.message}`);
  }
});
