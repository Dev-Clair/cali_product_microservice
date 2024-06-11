const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/products")
  .get(Controller.retrieveProductCollection)
  .post(Controller.methodNotAllowed);

Router.route("/products/info").get(Controller.retrieveProductApiInfo);

Router.route("/products/search").get(Controller.retrieveProductSearch);

Router.route("/products/:id")
  .get(Controller.retrieveProductItem)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = { Router };
