const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const RouterV1 = express.Router();

RouterV1.route("/")
  .get(Controller.retrieveProductCollection)
  .post(Controller.methodNotAllowed);

RouterV1.route("/info").get(Controller.retrieveProductApiInfo);

RouterV1.route("/search").get(Controller.retrieveProductSearch);

RouterV1.route("/:id")
  .get(Controller.retrieveProductItem)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = RouterV1;
