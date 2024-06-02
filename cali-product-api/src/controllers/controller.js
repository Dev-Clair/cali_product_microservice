const { Product } = require("../models/model");

/**
 * Retrieve information about the Product API.
 */
const retrieveProductApiInfo = (req, res, next) => {
  return res.status(200).json({
    name: "cali_product_microservice",
    version: "1.0.0",
    status: "active",
    guide: {
      collection_operations: [
        {
          path: "/api/v1/products/",
          allowed: ["GET"],
          not_allowed: ["POST"],
        },
        {
          path: "/api/v1/products/search",
          allowed: ["GET"],
          not_allowed: ["POST"],
        },
      ],
      item_operations: {
        path: "/api/v1/products/:id",
        allowed: ["GET"],
        not_allowed: ["PUT", "PATCH", "DELETE"],
      },
    },
  });
};

/**
 * Retrieve product collection.
 */
const retrieveProductCollection = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      count: products.length,
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieve an existing or collection of products based on search parameter.
 */
const retrieveProductSearch = async (req, res, next) => {
  try {
    const products = await Product.find({
      $text: { $search: req.query.q, $caseSensitive: false },
    });

    if (!products) {
      return res
        .status(404)
        .json({ message: `No products found for search: ${req.query.q}` });
    }

    return res.status(200).json({
      count: products.length,
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieve an existing product using its :id / :slug.
 */
const retrieveProductItem = async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    if (!product) {
      return res
        .status(404)
        .json({ message: `No product found for id: ${req.params.id}` });
    }

    return res.status(200).json({ product: product });
  } catch (err) {
    next(err);
  }
};

/**
 * Handle not allowed methods: POST | PUT | PATCH | DELETE.
 */
const methodNotAllowed = (req, res) => {
  return res.status(405).json({ message: "Method Not Allowed" });
};

module.exports = {
  retrieveProductApiInfo,
  retrieveProductSearch,
  retrieveProductCollection,
  retrieveProductItem,
  methodNotAllowed,
};
