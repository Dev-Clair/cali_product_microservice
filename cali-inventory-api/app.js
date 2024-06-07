const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const express_mongo_sanitize = require("express-mongo-sanitize");
const Router = require("./src/routers/router");

// Create an Express Application Instance
const App = express();

// Define Middlewares
App.use(express.json());

App.use(express.urlencoded({ extended: true }));

App.use(helmet());

App.use(hpp());

App.use(express_mongo_sanitize());

// Define Routes
App.use("/api/v1/inventories", Router.Router);

App.all("*", (req, res, next) => {
  return res.status(404).json({
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

App.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    console.error({ status: `${err.status}`, message: `${err.message}` });

    return res.status(400).json({ message: "Bad JSON" });
  }

  next(err);
});

App.use((err, req, res, next) => {
  console.error(err.message);

  if (!res.headersSent) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return;
});

module.exports = App;
