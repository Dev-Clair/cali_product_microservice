const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Product } = require("./model");

// Load Environment Variables
dotenv.config(".env");

const consumer = async (messageString) => {
  const message = JSON.parse(messageString);

  const operation = message.operation;

  const product = message.product;

  const connectionString = process.env.MONGO_URI;

  // Establish Database Connection
  const databaseConnection = await mongoose.connect(connectionString);

  databaseConnection
    .then(() => {
      console.log(`Database Connection Successful.`);
    })
    .catch((error) => {
      console.error(`Database Connection Unsuccessful: ${error.message}.`);
    });

  // Persist Operation
  switch (operation) {
    case "POST":
      try {
        const result = await Product.create(product);

        console.log(`POST: Success | Resource: (${true}).`);
      } catch (error) {
        console.error(`POST: Failure | Error: ${error.message}.\n`);
      }
      break;

    case "PUT":
      try {
        const result = await Product.findOneAndReplace(
          { product_id: product.product_id },
          product
        );

        console.log(
          `PUT: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
        );
      } catch (error) {
        console.error(`PUT: Failure | Error: ${error.message}.`);
      }
      break;

    case "PATCH":
      try {
        const result = await Product.findOneAndUpdate(
          { product_id: product.product_id },
          product
        );

        console.log(
          `PATCH: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
        );
      } catch (error) {
        console.error(`PATCH: Failure | Error: ${error.message}.`);
      }
      break;

    case "DELETE":
      try {
        const result = await Product.findOneAndDelete({
          product_id: product.product_id,
        });

        console.log(
          `DELETE: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
        );
      } catch (error) {
        console.error(`DELETE: Failure | Error: ${error.message}.`);
      }
      break;

    default:
      console.error(
        `${operation}: Invalid | Resource: ${product.product_name || ""}.`
      );
      break;
  }
};

module.exports = { consumer };
