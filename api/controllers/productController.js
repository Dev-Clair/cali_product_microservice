const productModel = require("../models/productModel");
const logger = require("../../service/loggerService");

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
exports.retrieveProducts = async (req, res, next) => {
  // Retrieves product collection
  try {
    const products = await productModel.find();

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
exports.searchProducts = async (req, res, next) => {
  // Retrieves an existing or collection of products based on search parameter
  try {
    const products = await productModel.findOne({
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

/**
 *
 * Item Operation
 *
 */
exports.retrieveProduct = async (req, res, next) => {
  // Retrieves an existing product using its :id / :slug
  try {
    const product = await productModel.findById({ _id: req.params.id });

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
exports.methodNotAllowed = (req, res, next) => {
  res.status(405).json({ message: "Method Not Allowed" });
};
