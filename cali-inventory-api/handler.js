const serverless = require("serverless-http");
const app = require("./app");
const getDbConnection = require("./connection");

getDbConnection;

exports.inventory = serverless(app);
