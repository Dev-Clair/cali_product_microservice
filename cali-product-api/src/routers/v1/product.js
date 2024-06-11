const express = require("express");
const Middleware = require("../../middlewares/middleware");
const ControllerV1 = require("../../controllers/v1/productController");

const RouterV1 = express.Router();

RouterV1.route("/")
  .get(ControllerV1.retrieveProductCollection)
  .post(ControllerV1.methodNotAllowed);

RouterV1.route("/info").get(ControllerV1.retrieveProductApiInfo);

RouterV1.route("/search").get(ControllerV1.retrieveProductSearch);

RouterV1.route("/:id")
  .get(ControllerV1.retrieveProductItem)
  .put(ControllerV1.methodNotAllowed)
  .patch(ControllerV1.methodNotAllowed)
  .delete(ControllerV1.methodNotAllowed);

module.exports = RouterV1;
