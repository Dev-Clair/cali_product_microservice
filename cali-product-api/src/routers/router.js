const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.retrieveProductCollection)
  .post(Middleware.checkRequestContentType, Controller.methodNotAllowed);

Router.route("/info").get(Controller.retrieveProductApiInfo);

Router.route("/search").get(Controller.retrieveProductSearch);

Router.route("/:id")
  .get(Controller.retrieveProductItem)
  .put(Middleware.checkRequestContentType, Controller.methodNotAllowed)
  .patch(Middleware.checkRequestContentType, Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = { Router };
