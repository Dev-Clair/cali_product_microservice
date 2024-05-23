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

app.use("/api", productRouter.productRouter);

// Start Server, Database and Queue Processes
const port = process.env.PORT || 4000;

const rabbitmq_url = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const product_exchange = "product_exchange";

const product_queue = "product_queue";

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info(`////////////////////////////////////////////////`);
    logger.info(`Connected to MongoDB`);

    logger.info(`${product_queue} consumer started`);
    await productQueue.productQueue(
      rabbitmq_url,
      product_exchange,
      product_queue
    );

    logger.info(
      `Server process started: ${Date.now()} | Listening on port: ${port}`
    );
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
});
