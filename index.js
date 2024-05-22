const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./service/loggerservice");
const productqueue = require("./queue/productqueue");
const productrouter = require("./router/productrouter");

// Retrieve and Define Environment Variables
dotenv.config(".env");

const port = process.env.MONGO_PORT || 3000;

const rabbitmq_url = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const product_queue = "product_queue";

// Create an Express Application Instance
const app = express();

// Define Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("api/v1/products", productrouter);

// Configure Logger Transport Based on Environment
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Start Server, Database and Queue Processes
app.listen(port, () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info(`Starting ${product_queue} ...`);

        productqueue(rabbitmq_url, product_queue);
      });
  } catch (error) {
    logger.error(`${error.message}`);
  }

  logger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );
});
