const {
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productController");
const logger = require("../service/loggerService");

const amqp = require("amqplib");

async function productQueue(rabbitmq_url, product_exchange, product_queue) {
  try {
    const connection = await amqp.connect(rabbitmq_url);

    const channel = await connection.createChannel();

    await channel.assertExchange(product_exchange, "direct", { durable: true });

    await channel.assertQueue(product_queue, { durable: true });

    await channel.bindQueue(product_queue, product_exchange, "");

    // await channel.assertQueue(product_queue, { durable: true });

    channel.consume(product_queue, async (payload) => {
      if (payload != null) {
        const message = payload.content.toString();

        const product = await JSON.parse(message);

        await operation(product);

        channel.ack(payload);
      }
    });
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
}

async function operation(product) {
  const operation = product.operation;

  const product_data = product.product;

  switch (operation) {
    case "CREATE":
      await postProduct(product_data);
      break;

    case "PUT":
      await putProduct(product_data);
      break;

    case "PATCH":
      await patchProduct(product_data);
      break;

    case "DELETE":
      await deleteProduct(product_data);
      break;

    default:
      logger.info(
        `invalid ${operation} operation | product ID: ${product_data.product_id}`
      );
      break;
  }
}

module.exports = { productQueue };

// const amqp = require('amqplib');
// const productController = require('./controllers/productController');
// const logger = require('./service/logger');

// async function consumeMessages() {
//   try {
//     const connection = await amqp.connect(process.env.RABBITMQ_URL);
//     const channel = await connection.createChannel();

//     const queue = 'product_queue';
//     const exchange = 'product_exchange';

//     await channel.assertExchange(exchange, 'direct', { durable: true });
//     await channel.assertQueue(queue, { durable: true });
//     await channel.bindQueue(queue, exchange, '');

//     channel.consume(queue, async (msg) => {
//       if (msg !== null) {
//         const message = JSON.parse(msg.content.toString());
//         await handleOperation(message);
//         channel.ack(msg);
//       }
//     });

//     logger.info('Consumer is up and running');
//   } catch (error) {
//     logger.error(`RabbitMQ consumer error: ${error.message}`);
//   }
// }

// async function handleOperation(product) {
//   switch (product.operation) {
//     case 'CREATE':
//       await productController.createProduct(product);
//       break;
//     case 'UPDATE':
//       await productController.updateProduct(product);
//       break;
//     case 'DELETE':
//       await productController.deleteProduct(product);
//       break;
//     default:
//       logger.error(`Invalid operation: ${product.operation}`);
//       break;
//   }
// }

// consumeMessages();
