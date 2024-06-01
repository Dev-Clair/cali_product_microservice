const serverless = require("serverless-http");
const dotenv = require("dotenv");
const app = require("./app");
const { Connection } = require("./connection");

process.on("unCaughtException", () => {
  console.warn("unCaughtException: Shutting down gracefully");
  process.exit(1);
});

dotenv.config(".env");

const connection_uri = process.env.MONGO_URI;

Connection(connection_uri);

exports.inventory = serverless(app);
