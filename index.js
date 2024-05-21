const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("logger");
const { productqueue } = require("./queue/productqueue");
const productrouter = require("./route/productrouter");

dotenv.config(".env");

const app = express();

app.use(express.json());

app.use("api/v1/products", productrouter);

const port = process.env.MONGO_PORT || 3000;

app.listen(port, () => {
  // Start database
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(
        // Listen to chaanel for messages
        productqueue()
      )
      .catch();
  } catch (error) {
    // logger.log({
    //   level: "error",
    //   message: `${error.message}`,
    // });
  }
  // Log server start timestamp
  // logger.log({
  //   level: "info",
  // });
});
