const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const express_mongo_sanitize = require("express-mongo-sanitize");
const Router = require("./src/routers/router");

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(hpp());

app.use(express_mongo_sanitize());

app.use((err, req, res, next) => {
  console.error(err.message);

  if (!res.headersSent) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return;
});

// Define Routes
app.use("/api/v1/inventories", Router.Router);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

module.exports = app;
