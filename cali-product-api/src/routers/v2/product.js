const express = require("express");
const Middleware = require("../../middlewares/middleware");
const Controller = require("../../controllers/controller");

const RouterV2 = express.Router();

RouterV2.route("/")
  .get(Controller.retrieveProductCollection)
  .post(Controller.methodNotAllowed);

RouterV2.route("/info").get(Controller.retrieveProductApiInfo);

RouterV2.route("/search").get(Controller.retrieveProductSearch);

RouterV2.route("/:id")
  .get(Controller.retrieveProductItem)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = RouterV2;
