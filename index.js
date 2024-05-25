const dotenv = require("dotenv");
const express = require("express");
const { apiLogger } = require("./service/loggerService");
const { databaseService } = require("./service/databaseService");
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
  res.status(404).json({
    status: `Not Found`,
    message: `No resource or route defined for ${req.originalUrl}`,
  });
});

// Start Server and Database Processes
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  apiLogger.info(
    `Server process started: ${Date.now()} | Listening on port: ${port}`
  );

  try {
    await databaseService(process.env.MONGO_URI);
    apiLogger.info(`Connected to MongoDB`);
  } catch (error) {
    apiLogger.error(`Error: ${error.message}`);
  }
});
