const dotenv = require("dotenv");
const app = require("./app");

process.on("unCaughtException", () => {
  console.warn("CaughtException: Shutting down gracefully");
  process.exit(1);
});

// Load Environment Variables
dotenv.config(".env");

// Start Server and Database Processes
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );
});

process.on("unhandledRejection", () => {
  console.warn("UnhandledRejection: Shutting down gracefully");
  process.exit(1);
});
