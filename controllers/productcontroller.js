const productmodel = require("../models/productModel");
const logger = require("../service/loggerService");

/**
 *
 * Collection Operations
 *
 */
exports.getProducts = async (req, res) => {
  // Retrieves product collection
  try {
    const products = await productmodel.find();

    res.status(200).json({
      result: products.length,
      products: products,
    });
  } catch (error) {
    logger.error("error", `${error.message}`);

    res.status(500).json({
      result: products.length,
      error: error,
    });
  }
};

exports.postProduct = async (product) => {
  // Creates a new product
  try {
    const product = await productmodel.create(product);

    logger.info(
      `success | action: ${product.action} | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
};

/**
 *
 * Item Operations
 *
 */
exports.getProduct = async (req, res) => {
  // Retrieves an existing product using its :id / :slug
  try {
    const product = await productmodel.findById();

    res.status(200).json({
      result: product.length,
      product: product,
    });
  } catch (error) {
    logger.error(`${error.message}`);

    res.status(500).json({
      result: product.length,
      error: error,
    });
  }
};

exports.putProduct = async (product) => {
  // Modifies an existing product (entirely) using its :id / :slug
  try {
    const product = await productmodel.findOneAndReplace(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    logger.info(
      `success | action: ${product.action} | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
};

exports.patchProduct = async (product) => {
  // Modifies an existing product (partially) using its :id / :slug
  try {
    const product = await productmodel.findOneAndUpdate(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    logger.info(
      `success | action: ${product.action} | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
};

exports.deleteProduct = async (product) => {
  // Removes an existing product using its :id / :slug
  try {
    const product = await productmodel.findOneAndDelete({
      product_id: product.product_id,
    });

    logger.info(
      `success | action: ${product.action} | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.error("error", `${error.message}`);
  }
};

/**
 *
 * Hybrid Operations
 *
 */
exports.getSearchProducts = async (req, res) => {
  // Retrieves an existing or collection of products based on search parameter
  try {
    const products = await productmodel.find({
      $text: { $search: req.query.q },
    });

    res.status(200).json({
      result: products.length,
      products: products,
    });
  } catch (error) {
    logger.error("error", `${error.message}`);

    res.status(500).json({
      result: products.length,
      error: error,
    });
  }
};
