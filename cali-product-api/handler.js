const serverless = require("serverless-http");
const app = require("./app");
const GetDbConnection = require("./connection");

GetDbConnection;

exports.product = serverless(app);
