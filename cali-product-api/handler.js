const serverless = require("serverless-http");
const app = require("./app");
const getDbConnection = require("./connection");

process.on("unCaughtException", () => {
  console.warn("unCaughtException: Shutting down gracefully");
  process.exit(1);
});

getDbConnection;

exports.product = serverless(app);
