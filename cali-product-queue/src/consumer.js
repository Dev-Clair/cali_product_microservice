const Product = require("./model/productModel");
const { logger } = require("../service/loggerService");

const consumer = async (message) => {
  const operation = message.operation;

  const product = message.product;

  switch (operation) {
    case "POST":
      await Product.create(product);

      logger.info(
        `success | action: POST | product name: ${product.name} | product id: ${product.product_id}`
      );
      break;

    case "PUT":
      await Product.findOneAndUpdate(
        { product_id: product.product_id },
        product,
        { new: true }
      );

      logger.info(
        `success | action: PUT | product name: ${product.name} | product id: ${product.product_id}`
      );
      break;

    case "PATCH":
      await Product.findOneAndUpdate(
        { product_id: product.product_id },
        product,
        { new: true }
      );

      logger.info(
        `success | action: PATCH | product name: ${product.name} | product id: ${product.product_id}`
      );
      break;

    case "DELETE":
      await Product.findOneAndDelete({
        product_id: product.product_id,
      });

      logger.info(
        `success | action: DELETE | product name: ${product.name} | product id: ${product.product_id}`
      );
      break;

    default:
      logger.error(
        `invalid ${operation} operation | product ID: ${product.product_id}`
      );
      break;
  }
};

module.exports = { consumer };
