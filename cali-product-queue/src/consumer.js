const dotenv = require("dotenv");
const Product = require("./model/productModel");
const { databaseService } = require("./service/databaseService");
const { logger } = require("./service/loggerService");

// Load Environment Variables
dotenv.config(".env");

const consumer = async (message) => {
  const operation = message.operation;

  const product = message.product;

  const connectionString = process.env.MONGO_URI || "";

  await databaseService(connectionString);

  switch (operation) {
    case "POST":
      await Product.create(product);

      logger.info(
        `success | action: POST | product name: ${product.product_name}`
      );
      break;

    case "PUT":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      );

      logger.info(
        `success | action: PUT | product name: ${product.product_name}}`
      );
      break;

    case "PATCH":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      );

      logger.info(
        `success | action: PATCH | product name: ${product.product_name}`
      );
      break;

    case "DELETE":
      await Product.findOneAndDelete({
        _id: product._id,
      });

      logger.info(
        `success | action: DELETE | product name: ${product.product_name}`
      );
      break;

    default:
      logger.error(
        `invalid ${operation} operation | product name: ${product.product_name}`
      );
      break;
  }
};

module.exports = { consumer };
