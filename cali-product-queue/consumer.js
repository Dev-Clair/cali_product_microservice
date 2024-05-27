const dotenv = require("dotenv");
const { Product, Connection } = require("./model");

// Load Environment Variables
dotenv.config(".env");

const consumer = async (messageString) => {
  const message = JSON.parse(messageString);

  const operation = message.operation;

  const product = message.product;

  const connectionString = process.env.MONGO_URI;

  await Connection(connectionString)
    .then(() => {
      console.log(`Database Connection Successful.`);
    })
    .catch((error) => {
      console.error(`Database Connection Unsuccessful:\n${error}.`);
    });

  switch (operation) {
    case "POST":
      await Product.create(product)
        .then(() => {
          console.log(
            `status: success | action: POST | product name: ${product.product_name}.`
          );
        })
        .catch((error) => {
          console.error(`${error}.\n`);
        });
      break;

    case "PUT":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      )
        .then(() => {
          console.log(
            `status: success | action: PUT | product name: ${product.product_name}}.`
          );
        })
        .catch((error) => {
          console.error(`${error}.`);
        });
      break;

    case "PATCH":
      await Product.findOneAndUpdate(
        { product_name: product.product_name },
        product,
        { new: true }
      )
        .then(() => {
          console.log(
            `status: success | action: PATCH | product name: ${product.product_name}}.`
          );
        })
        .catch((error) => {
          console.error(`${error}.`);
        });
      break;

    case "DELETE":
      await Product.findOneAndDelete({
        product_name: product.product_name,
      })
        .then(() => {
          console.log(
            `status: success | action: DELETE | product name: ${product.product_name}.`
          );
        })
        .catch((error) => {
          console.error(`${error}.`);
        });
      break;

    default:
      console.warn(
        `invalid ${operation} operation | product name: ${product.product_name}.`
      );
      break;
  }
};

module.exports = { consumer };
