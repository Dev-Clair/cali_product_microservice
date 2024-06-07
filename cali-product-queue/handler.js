const Product = require("./model");
const GetDbConnection = require("./connection");

GetDbConnection;

exports.consumer = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);

    const operation = message.operation;

    const product = message.product;

    switch (operation) {
      case "POST":
        try {
          await Product.create(product);

          console.log(
            `POST: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
          );
        } catch (err) {
          console.error(`POST: Failure | Error: ${err.message}.\n`);
        }
        break;

      case "PUT":
        try {
          await Product.findOneAndReplace(
            { product_uuid: product.product_uuid },
            product
          );

          console.log(
            `PUT: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
          );
        } catch (err) {
          console.error(`PUT: Failure | Error: ${err.message}.`);
        }
        break;

      case "PATCH":
        try {
          await Product.findOneAndUpdate(
            { product_uuid: product.product_uuid },
            product
          );

          console.log(
            `PATCH: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
          );
        } catch (err) {
          console.error(`PATCH: Failure | Error: ${err.message}.`);
        }
        break;

      case "DELETE":
        try {
          await Product.findOneAndDelete({
            product_uuid: product.product_uuid,
          });

          console.log(
            `DELETE: Success | Resource uuid: ${product.product_uuid}| Resource name: ${product.product_name}.`
          );
        } catch (err) {
          console.error(`DELETE: Failure | Error: ${err.message}.`);
        }
        break;

      default:
        console.error(
          `${operation}: Invalid | Resource: ${product.product_name || ""}.`
        );
        break;
    }
  }
};
