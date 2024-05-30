const express = require("express");
const Router = require("./src/routers/router");

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  res.send(500).json({ status: "Internal Server Error" });
  console.error(err.message);
  next();
});

// Define Routes
app.use("/api/v1/inventories", Router.Router);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: `Not Found`,
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

module.exports = app;
