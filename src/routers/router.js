const express = require("express");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.retrieveProducts)
  .post(Controller.methodNotAllowed);

Router.route("/info").get(Controller.retrieveApiInfo);

Router.route("/search?q=").get(Controller.retrieveProductSearch);

Router.route("/:id")
  .get(Controller.retrieveProduct)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = { Router };
