const serverless = require("serverless-http");
const app = require("./app");
const getDbConnection = require("./connection");

getDbConnection;

// app.listen(3999, () => {
//   console.log(`Server process started, listening on port 3999`);
// });

exports.inventory = serverless(app);
