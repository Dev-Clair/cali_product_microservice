const Product = require("../models/productModel");
const { logger } = require("../../service/loggerService");

/**
 *
 * Info Operation
 *
 */
const retrieveApiInfo = (req, res) => {
  // Retrieves information about the API
  res.status(200).json({
    name: "cali_product_microservice",
    version: "1.0.0",
    collection_operations: {
      path: "api/v1/products/search?q=",
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
const retrieveProducts = async (req, res, next) => {
  // Retrieves product collection
  try {
    const products = await Product.find();

    res.status(200).json({
      count: products.length,
      products: products,
    });
  } catch (error) {
    logger.error(`${error.message}`);

    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * Collection Operation
 *
 */
const retrieveProductSearch = async (req, res, next) => {
  // Retrieves an existing or collection of products based on search parameter
  try {
    const products = await Product.findOne({
      $text: { $search: req.query.q, $caseSensitive: false },
    });

    res.status(200).json({
      count: products.length,
      products: products,
    });
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
const retrieveProduct = async (req, res, next) => {
  // Retrieves an existing product using its :id / :slug
  try {
    const product = await Product.findById({ _id: req.params.id });

    if (!product) {
      res
        .status(404)
        .json({ message: `No product found for id: ${req.params.id}` });
    }

    res.status(200).json({ product: product });
  } catch (error) {
    logger.error(`${error.message}`);

    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * Not allowed Operation: POST | PUT | PATCH | DELETE
 *
 */
const methodNotAllowed = (req, res, next) => {
  res.status(405).json({ message: "Method Not Allowed" });
};

module.exports = {
  retrieveApiInfo,
  retrieveProductSearch,
  retrieveProducts,
  retrieveProduct,
  methodNotAllowed,
};
