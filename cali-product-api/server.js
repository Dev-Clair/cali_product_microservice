const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

process.on("unCaughtException", () => {
  console.warn("unCaughtException: Shutting down gracefully");
  process.exit(1);
});

// Load Environment Variables
dotenv.config(".env");

// Start Node Server
const port = process.env.PORT || 4000;

const connectionString = process.env.MONGO_URI;

app.listen(port, async () => {
  console.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  // Establish Database Connection
  mongoose
    .connect(connectionString)
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
