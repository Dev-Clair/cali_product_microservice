const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./service/logger");
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

// Start Server, Database and Queue Processes
app.listen(port, () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        productqueue(rabbitmq_url, product_queue);
      });
  } catch (error) {
    logger.error({ message: `${error.message}` });
  }

  logger.info({ message: Date.now() });
});
