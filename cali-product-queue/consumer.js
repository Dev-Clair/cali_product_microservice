const dotenv = require("dotenv");
const { Product, Connection } = require("./model");

// Load Environment Variables
dotenv.config(".env");

const consumer = async (messageString) => {
  const message = JSON.parse(messageString);

  const operation = message.operation;

  const product = message.product;

  const connectionString = process.env.MONGO_URI;

  // Establish Database Connection
  await Connection(connectionString)
    .then(() => {
      console.log(`Database Connection Successful.`);
    })
    .catch((error) => {
      console.error(`Database Connection Unsuccessful: ${error.message}.`);
    });

  // Carryout Operation
  switch (operation) {
    case "POST":
      await Product.create(product)
        .then(() => {
          console.log(`POST: Success | Resource: ${product.product_name}.`);
        })
        .catch((error) => {
          console.error(`${operation} Error: ${error.message}.\n`);
        });
      break;

    case "PUT":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      )
        .then(() => {
          console.log(`PUT: Success | Resource: ${product.product_name}}.`);
        })
        .catch((error) => {
          console.error(`${operation} Error: ${error.message}.`);
        });
      break;

    case "PATCH":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      )
        .then(() => {
          console.log(`PATCH: Success | Resource: ${product.product_name}}.`);
        })
        .catch((error) => {
          console.error(`${operation} Error: ${error.message}.`);
        });
      break;

    case "DELETE":
      await Product.findOneAndDelete({
        product_name: product.product_name,
      })
        .then(() => {
          console.log(`DELETE: Success | Resource: ${product.product_name}.`);
        })
        .catch((error) => {
          console.error(`${operation} Error: ${error.message}.`);
        });
      break;

    default:
      console.warn(
        `Invalid operation: ${operation} | Resource: ${product.product_name}.`
      );
      break;
  }
};

module.exports = { consumer };
