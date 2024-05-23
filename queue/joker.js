const {
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productController");
const logger = require("../service/loggerService");

const amqp = require("amqplib");

async function productQueue(rabbitmq_url, product_queue) {
  try {
    const connection = await amqp.connect(rabbitmq_url);

    const channel = await connection.createChannel();

    await channel.assertQueue(product_queue, { durable: true });

    channel.consume(product_queue, (payload) => {
      if (payload != null) {
        const message = payload.content.toString();

        const product = JSON.parse(message);

        operation(product);

        channel.ack(payload);
      }
    });
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
}

function operation(product) {
  const operation = product.operation;

  const product = product.product;

  switch (operation) {
    case "CREATE":
      postProduct(product);
      break;

    case "PUT":
      putProduct(product);
      break;

    case "PATCH":
      patchProduct(product);
      break;

    case "DELETE":
      deleteProduct(product);
      break;

    default:
      logger.info(
        `invalid ${operation} operation | product ID: ${product.product_id}`
      );
      break;
  }
}

module.exports = { productQueue };
