const productcontroller = require("../../controllers/productcontroller");
const logger = require("../service/loggerservice");

const amqp = require("amqplib");

async function productqueue(rabbitmq_url, product_queue) {
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
    logger.error(`${error.message}`);
  }
}

function operation(product) {
  switch (product.operation) {
    case "CREATE":
      productcontroller.post(product);
      break;

    case "PUT":
      productcontroller.patch(product);
      break;

    case "PATCH":
      productcontroller.patch(product);
      break;

    case "DELETE":
      productcontroller.delete(product);
      break;

    default:
      logger.info(
        `invalid ${product.operation} operation | product: ${product.product_id}`
      );
      break;
  }
}

module.exports = { productqueue };
