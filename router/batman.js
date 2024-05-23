const express = require("express");
const {
  getProducts,
  getProduct,
  getSearchProducts,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.route("/").get(getProducts);

productRouter.route("/search?").get(getSearchProducts);

productRouter.route("/:id").get(getProduct);

module.exports = productRouter();
