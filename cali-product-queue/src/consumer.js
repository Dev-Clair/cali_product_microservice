const dotenv = require("dotenv");
const Product = require("./model/productModel");
const { databaseService } = require("./service/databaseService");

// Load Environment Variables
dotenv.config(".env");

const consumer = async (messageString) => {
  const message = JSON.parse(messageString);

  console.log(message);

  const operation = message.operation;

  const product = message.product;

  const connectionString = process.env.MONGO_URI || "";

  await databaseService(connectionString);

  switch (operation) {
    case "POST":
      await Product.create(product)
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
      await Product.findOneAndUpdate(
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
      await Product.findOneAndUpdate(
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
      await Product.findOneAndDelete({
        _id: product._id,
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
};

module.exports = { consumer };
