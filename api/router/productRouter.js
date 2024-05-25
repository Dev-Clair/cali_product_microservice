const express = require("express");
const productController = require("../controllers/productController");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.retrieveProducts)
  .get(productController.searchProducts)
  .post(productController.createProducts);

productRouter.route("/info").get(productController.retrieveApiInfo);

productRouter
  .route("/:id")
  .get(productController.retrieveProduct)
  .put(productController.replaceProduct)
  .patch(productController.updateProduct)
  .delete(productController.removeProduct);

module.exports = { productRouter };
