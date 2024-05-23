const express = require("express");
const productController = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/v1/products/", productController.getProducts);

productRouter.get("/v1/products/search?", productController.getSearchProducts);

productRouter.get("/v1/products/:id", productController.getProduct);

module.exports = { productRouter };
