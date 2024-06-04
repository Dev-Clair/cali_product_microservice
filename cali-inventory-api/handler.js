const serverless = require("serverless-http");
const app = require("./app");
const getDbConnection = require("./connection");

process.on("unCaughtException", () => {
  console.warn("unCaughtException: Shutting down gracefully");
  process.exit(1);
});

getDbConnection;

// app.listen(3999, () => {
//   console.log(`Server process started, listening on port 3999`);
// });

exports.inventory = serverless(app);
