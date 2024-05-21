const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./service/logger");
const productqueue = require("./queue/productqueue");
const productrouter = require("./route/productrouter");

dotenv.config(".env");

const port = process.env.MONGO_PORT || 3000;

const rabbitmq_url = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const product_queue = "product_queue";

const app = express();

app.use(express.json());

app.use("api/v1/products", productrouter);

app.listen(port, () => {
  // Start database
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(
        // Listen to queue in channel for messages
        productqueue(rabbitmq_url, product_queue)
      )
      .catch();
  } catch (error) {
    logger.log({
      level: "error",
      message: `${error.message}`,
    });
  }
  // Log server start timestamp
  logger.log({
    level: "info",
    message: new Date().now(),
  });
});
