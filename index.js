const dotenv = require("dotenv");
const app = require("./app");

process.on("unCaughtException", () => {
  logger.info("CaughtException: Shutting down gracefully");
  process.exit(1);
});

// Load Environment Variables
dotenv.config(".env");

// Start Server and Database Processes
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  logger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  try {
    await databaseService(process.env.MONGO_URI);
    console.info(`Connected to MongoDB`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

process.on("unhandledRejection", () => {
  logger.info("UnhandledRejection: Shutting down gracefully");
  process.exit(1);
});
