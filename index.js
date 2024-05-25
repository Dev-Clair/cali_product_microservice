const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./api/service/loggerService");
const productRouter = require("./api/router/productRouter");

// Load Environment Variables
dotenv.config(".env");

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productRouter.productRouter);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: `No resource or route defined for ${req.originalUrl}` });
});

// Start Server and Database Processes
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  logger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info(`Connected to MongoDB`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
});
