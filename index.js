const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./service/loggerService");
const productQueue = require("./queue/productQueue");
const productRouter = require("./router/productRouter");

// Retrieve and Define Environment Variables
dotenv.config(".env");

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", productRouter);

// Configure Logger Transport Based on Environment
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Start Server, Database and Queue Processes
const port = process.env.MONGO_PORT || 3000;

const rabbitmq_url = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const product_exchange = "product_exchange";

const product_queue = "product_queue";

app.listen(port, () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info(`Starting ${product_queue} ...`);

        productQueue.productQueue(
          rabbitmq_url,
          product_exchange,
          product_queue
        );
      });
  } catch (error) {
    logger.error("error", `${error.message}`);
  }

  logger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );
});
