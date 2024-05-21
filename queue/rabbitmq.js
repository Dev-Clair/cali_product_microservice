const amqp = require("amqplib");
const productcontroller = require("./../controller/productcontroller");
const logger = require("logger");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const QUEUE = "product";

async function messageQueue() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    channel.consume(QUEUE, (message) => {
      if (message != null) {
        const messageContent = message.content.toString();

        const product = JSON.parse(messageContent);

        switch (product.action) {
          case post:
            postProduct(product);
            break;

          case put:
            putProduct(product);
            break;

          case patch:
            patchProduct(product);
            break;

          case remove:
            deleteProduct(product);
            break;

          default:
            logger.log({
              level: "info",
              message: "failed to resolve product",
              data: { product },
            });
            break;
        }

        channel.ack(message);
      }
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `${error.message}`,
    });
  }
}

function postProduct(product) {
  productcontroller.postProduct(product);
}

function putProduct(product) {
  productcontroller.putProduct(product);
}

function patchProduct(product) {
  productcontroller.patchProduct(product);
}

function deleteProduct(product) {
  productcontroller.deleteProduct(product);
}

module.exports = { messageQueue };
