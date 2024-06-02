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
  res.send(500).json({ message: "Internal Server Error" });
  console.error(err.message);
  next();
});

// Define Routes
app.use("/api/v1/products", Router.Router);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

module.exports = app;
