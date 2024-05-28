const dotenv = require("dotenv");
const app = require("./app");
const Connection = require("./src/models/model");

process.on("unCaughtException", () => {
  console.warn("CaughtException: Shutting down gracefully");
  process.exit(1);
});

// Load Environment Variables
dotenv.config(".env");

// Start Server and Database Processes
const port = process.env.PORT || 4000;

const connectionString = process.env.MONGO_URI;

app.listen(port, async () => {
  console.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  await Connection(connectionString)
    .then(() => {
      console.info(`Database Connection Successful`);
    })
    .catch((error) => {
      console.error(`Database Connection Unsuccessful: ${error.message}.`);
    });
});

process.on("unhandledRejection", () => {
  console.warn("UnhandledRejection: Shutting down gracefully");
  process.exit(1);
});
