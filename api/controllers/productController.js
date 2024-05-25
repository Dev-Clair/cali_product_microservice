const productmodel = require("../models/productModel");
const logger = require("../service/loggerService");

/**
 *
 * Info Operation
 *
 */
exports.retrieveApiInfo = (req, res) => {
  // Retrieves information about the API
  res.status(200).json({
    name: "cali_product_microservice",
    version: "1.0.0",
    collection_operations: {
      path: "api/v1/products?search=",
      allowed: ["GET"],
      not_allowed: ["POST"],
    },
    item_operations: {
      path: "api/v1/products/:id",
      allowed: ["GET"],
      not_allowed: ["PUT", "PATCH", "DELETE"],
    },
  });
};

/**
 *
 * Collection Operation
 *
 */
exports.retrieveProducts = async (req, res) => {
  // Retrieves product collection
  try {
    const products = await productmodel.find();

    res.status(200).json({
      count: products.length,
      products: products,
    });
  } catch (error) {
    logger.error("error", `${error.message}`);

    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * Collection Operation
 *
 */
exports.createProducts = (req, res) => {
  // Saves a product to the collection
  res.status(405).json({ status: "Method Not Allowed" });
};

/**
 *
 * Item Operation
 *
 */
exports.retrieveProduct = async (req, res) => {
  // Retrieves an existing product using its :id / :slug
  try {
    const product = await productmodel.findById({ _id: req.params.id });

    res.status(200).json({ product: product });
  } catch (error) {
    logger.error(`${error.message}`);

    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * Item Operation
 *
 */
exports.replaceProduct = (req, res) => {
  // Modifies an existing product (entirely) using its :id / :slug
  res.status(405).json({ status: "Method Not Allowed" });
};

/**
 *
 * Item Operation
 *
 */
exports.updateProduct = (req, res) => {
  // Modifies an existing product (partially) using its :id / :slug
  res.status(405).json({ status: "Method Not Allowed" });
};

/**
 *
 * Item Operation
 *
 */
exports.removeProduct = async (req, res) => {
  // Removes an existing product using its :id / :slug
  res.status(405).json({ status: "Method Not Allowed" });
};

/**
 *
 * Hybrid Operation
 *
 */
exports.searchProducts = async (req, res) => {
  // Retrieves an existing or collection of products based on search parameter
  try {
    const products = await productmodel.findOne({
      $text: { $search: req.query.q, $caseSensitive: false },
    });

    res.status(200).json({
      count: products.length,
      products: products,
    });
  } catch (error) {
    logger.error("error", `${error.message}`);

    res.status(500).json({ error: error.message });
  }
};
