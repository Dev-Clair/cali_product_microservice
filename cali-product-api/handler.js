const serverless = require("serverless-http");
const App = require("./app");
const GetDbConnection = require("./connection");

GetDbConnection;

exports.product = serverless(App);
