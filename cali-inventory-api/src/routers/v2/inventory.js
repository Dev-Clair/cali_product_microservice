const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const RouterV2 = express.Router();

RouterV2.route("/")
  .get(Controller.methodNotAllowed)
  .post(Middleware.checkRequestContentType, Controller.createInventory);

RouterV2.route("/info").get(Controller.retrieveInventoryApiInfo);

RouterV2.route("/search").get(Controller.retrieveInventorySearch);

RouterV2.route("/:id")
  .get(Controller.retrieveInventoryItem)
  .put(Middleware.checkRequestContentType, Controller.replaceInventory)
  .patch(Middleware.checkRequestContentType, Controller.updateInventory)
  .delete(Controller.deleteInventory);

module.exports = RouterV2;
