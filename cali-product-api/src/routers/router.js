const express = require("express");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.retrieveProductCollection)
  .post(Controller.methodNotAllowed);

Router.route("/info").get(Controller.retrieveProductApiInfo);

Router.route("/search").get(Controller.retrieveProductSearch);

Router.route("/:id")
  .get(Controller.retrieveProductItem)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = { Router };
