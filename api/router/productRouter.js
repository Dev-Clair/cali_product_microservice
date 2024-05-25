const express = require("express");
const productController = require("../controllers/productController");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.retrieveProducts)
  // .get(productController.searchProducts)
  .post(productController.methodNotAllowed);

productRouter.route("/info").get(productController.retrieveApiInfo);

productRouter.route("/search?q=").get(productController.searchProducts);

productRouter
  .route("/:id")
  .get(productController.retrieveProduct)
  .put(productController.methodNotAllowed)
  .patch(productController.methodNotAllowed)
  .delete(productController.methodNotAllowed);

module.exports = { productRouter };
