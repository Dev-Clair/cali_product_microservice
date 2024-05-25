const productController = require("../queue/controllers/productController");
const logger = require("../queue/service/loggerService");

async function productQueueConsumer(message) {
  const operation = message.operation;

  const product = message.product;

  switch (operation) {
    case "CREATE":
      await productController.createProduct(product);
      break;

    case "PUT":
      await productController.replaceProduct(product);
      break;

    case "PATCH":
      await productController.updateProduct(product);
      break;

    case "DELETE":
      await productController.removeProduct(product);
      break;

    default:
      logger.info(
        `invalid ${operation} operation | product ID: ${product.product_id}`
      );
      break;
  }
}

module.exports = { productQueueConsumer };
