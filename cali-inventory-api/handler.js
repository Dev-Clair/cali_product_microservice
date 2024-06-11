const serverless = require("serverless-http");
const App = require("./app");
const Config = require("./config");
const GetConnection = require("./connection");

GetConnection(Config.MONGO_URI);

if (Config.NODE_ENV === "development") {
  App.listen(Config.PORT || 3999, () => {
    console.log(
      `Server process started, listening on port ${Config.PORT || 3999}`
    );
  });
} else {
  exports.inventory = serverless(App);
}
