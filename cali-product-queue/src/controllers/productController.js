const { queueLogger } = require("../../service/loggerService");
const productModel = require("../models/productModel");

/**
 *
 * Collection Operation
 *
 */
exports.createProduct = async (product) => {
  // Creates a new product in collection
  try {
    const product = await productModel.create(product);

    queueLogger.info(
      `success | action: POST | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    queueLogger.error(`${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.replaceProduct = async (product) => {
  // Modifies an existing product (entirely) using its  product_id
  try {
    const product = await productModel.findOneAndUpdate(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    queueLogger.info(
      `success | action: PUT | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    queueLogger.error(`${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.updateProduct = async (product) => {
  // Modifies an existing product (partially) using its  product_id
  try {
    const product = await productModel.findOneAndUpdate(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    queueLogger.info(
      `success | action: PATCH | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    queueLogger.error(`${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.removeProduct = async (product) => {
  // Removes an existing product using its product_id
  try {
    const product = await productModel.findOneAndDelete({
      product_id: product.product_id,
    });

    queueLogger.info(
      `success | action: DELETE | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    queueLogger.error(`${error.message}`);
  }
};
