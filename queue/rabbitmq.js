const dotenv = require("dotenv");
const productcontroller = require("./../controller/productcontroller");
const logger = require("logger");

dotenv.config(".env.local");

const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const PRODUCT_QUEUE = "product_queue";

async function messageQueue() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue(PRODUCT_QUEUE, { durable: true });

    channel.consume(PRODUCT_QUEUE, (payload) => {
      if (payload != null) {
        const message = payload.content.toString();

        const product = JSON.parse(message);

        operation(product);

        channel.ack(payload);
      }
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `${error.message}`,
    });
  }
}

function operation(product) {
  switch (product.operation) {
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
      logger.log({
        level: "info",
        message: "Invalid Resource Operation",
        data: { product },
      });
      break;
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
