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
      console.log(`Database Connection Successful.\n`);
      switch (operation) {
        case "POST":
          Product.create(product)
            .then(() => {
              console.log(
                `status: success | action: POST | product name: ${product.product_name}`
              );
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          break;

        case "PUT":
          Product.findOneAndUpdate(
            { product_name: product.product_name },
            product,
            { new: true }
          )
            .then(() => {
              console.log(
                `status: success | action: PUT | product name: ${product.product_name}}`
              );
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          break;

        case "PATCH":
          Product.findOneAndUpdate(
            { product_name: product.product_name },
            product,
            { new: true }
          )
            .then(() => {
              console.log(
                `status: success | action: PATCH | product name: ${product.product_name}}`
              );
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          break;

        case "DELETE":
          Product.findOneAndDelete({
            product_name: product.product_name,
          })
            .then(() => {
              console.log(
                `status: success | action: DELETE | product name: ${product.product_name}`
              );
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          break;

        default:
          console.log(
            `invalid ${operation} operation | product name: ${product.product_name}`
          );
          break;
      }
    })
    .catch((error) => {
      console.log(`Database Connection Unsuccessful:\n${error}`);
    });
};

module.exports = { consumer };
