const express = require("express");
const Middleware = require("../../middlewares/middleware");
const ControllerV2 = require("../../controllers/v2/productController");

const RouterV2 = express.Router();

RouterV2.route("/")
  .get(ControllerV2.retrieveProductCollection)
  .post(ControllerV2.methodNotAllowed);

RouterV2.route("/info").get(ControllerV2.retrieveProductApiInfo);

RouterV2.route("/search").get(ControllerV2.retrieveProductSearch);

RouterV2.route("/:id")
  .get(ControllerV2.retrieveProductItem)
  .put(ControllerV2.methodNotAllowed)
  .patch(ControllerV2.methodNotAllowed)
  .delete(ControllerV2.methodNotAllowed);

module.exports = RouterV2;
