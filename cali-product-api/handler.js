const serverless = require("serverless-http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("unCaughtException", () => {
  console.warn("unCaughtException: Shutting down gracefully");
  process.exit(1);
});

// Load Environment Variables
dotenv.config(".env");

// Establish Database Connection
const connectionString = process.env.MONGO_URI;

const databaseConnection = mongoose.connect(connectionString);

databaseConnection
  .then(() => {
    console.info(`Database Connection Successful`);
  })
  .catch((error) => {
    console.error(`Database Connection Unsuccessful: ${error.message}.`);
  });

exports.product = serverless(app);
