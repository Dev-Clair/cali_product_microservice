const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.methodNotAllowed)
  .post(Middleware.checkRequestContentType, Controller.createInventory);

Router.route("/info").get(Controller.retrieveInventoryApiInfo);

Router.route("/search").get(Controller.retrieveInventorySearch);

Router.route("/:id")
  .get(Controller.retrieveInventoryItem)
  .put(Middleware.checkRequestContentType, Controller.replaceInventory)
  .patch(Middleware.checkRequestContentType, Controller.updateInventory)
  .delete(Controller.deleteInventory);

module.exports = { Router };
