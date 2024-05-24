const productmodel = require("../models/productModel");
const logger = require("../service/loggerService");

/**
 *
 * Collection Operation
 *
 */
exports.getProducts = async (req, res) => {
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

exports.postProducts = async (req, res) => {
  // Saves a product to collection
  try {
    const products = await productmodel.create(req.body);

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
exports.createProduct = async (product) => {
  // Creates a new product
  try {
    const product = await productmodel.create(product);

    logger.info(
      `success | action: CREATE | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.warn("error", `${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.getProduct = async (req, res) => {
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
exports.replaceProduct = async (product) => {
  // Modifies an existing product (entirely) using its :id / :slug
  try {
    const product = await productmodel.findOneAndReplace(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    logger.info(
      `success | action: REPLACE | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.warn("error", `${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.updateProduct = async (product) => {
  // Modifies an existing product (partially) using its :id / :slug
  try {
    const product = await productmodel.findOneAndUpdate(
      { product_id: product.product_id },
      product,
      { new: true }
    );

    logger.info(
      `success | action: UPDATE | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.warn("error", `${error.message}`);
  }
};

/**
 *
 * Item Operation
 *
 */
exports.removeProduct = async (product) => {
  // Removes an existing product using its :id / :slug
  try {
    const product = await productmodel.findOneAndDelete({
      product_id: product.product_id,
    });

    logger.info(
      `success | action: REMOVE | product name: ${product.name} | product id: ${product.product_id}`
    );
  } catch (error) {
    logger.warn("error", `${error.message}`);
  }
};

/**
 *
 * Hybrid Operation
 *
 */
exports.getSearchProducts = async (req, res) => {
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
