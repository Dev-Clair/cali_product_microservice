const express = require("express");
const productRouter = require("./api/router/productRouter");

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productRouter.productRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: `Not Found`,
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

module.exports = app;
