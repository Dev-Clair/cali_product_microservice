const amqp = require("amqplib");
const productController = require("../controllers/productController");
const logger = require("../service/loggerService");

async function productQueue(
  rabbitmq_url,
  product_exchange = null,
  product_queue
) {
  try {
    const connection = await amqp.connect(rabbitmq_url);

    const channel = await connection.createChannel();

    // await channel.assertExchange(product_exchange, "direct", { durable: true });

    // await channel.assertQueue(product_queue, { durable: true });

    // await channel.bindQueue(product_queue, product_exchange, "");

    await channel.assertQueue(product_queue, { durable: true });

    channel.consume(product_queue, async (payload) => {
      if (payload != null) {
        const message = payload.content.toString();

        const product = await JSON.parse(message);

        await operation(product);

        channel.ack(payload);
      }
    });
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 600);
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
}

async function operation(product) {
  const operation = product.operation;

  const product_data = product.product;

  switch (operation) {
    case "CREATE":
      await productController.createProduct(product_data);
      break;

    case "PUT":
      await productController.replaceProduct(product_data);
      break;

    case "PATCH":
      await productController.updateProduct(product_data);
      break;

    case "DELETE":
      await productController.removeProduct(product_data);
      break;

    default:
      logger.info(
        `invalid ${operation} operation | product ID: ${product_data.product_id}`
      );
      break;
  }
}

module.exports = { productQueue };
