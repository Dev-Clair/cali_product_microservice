const dotenv = require("dotenv");
const productcontroller = require("../controller/productcontroller");
const logger = require("logger");

dotenv.config(".env.local");

const amqp = require("amqplib");

const rabbitmq_url = process.env.RABBITMQ_URL || "amqp//localhost:5672";

const product_queue = "product_queue";

async function productqueue() {
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
    logger.log({
      level: "error",
      message: `${error.message}`,
    });
  }
}

function operation(product) {
  switch (product.operation) {
    case "CREATE":
      productcontroller.post(product);
      break;

    case "PUT":
      productcontroller.put(product);
      break;

    case "PATCH":
      productcontroller.patch(product);
      break;

    case "DELETE":
      productcontroller.delete(product);
      break;

    default:
      // logger.log({
      //   level: "info",
      //   message: "Invalid Resource Operation",
      //   data: { product },
      // });
      break;
  }
}

module.exports = { productqueue };
