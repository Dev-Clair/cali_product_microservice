const express = require("express");
const Middleware = require("../middlewares/middleware");
const Controller = require("../controllers/controller");

const RouterV1 = express.Router();

RouterV1.route("/")
  .get(Controller.methodNotAllowed)
  .post(Middleware.checkRequestContentType, Controller.createInventory);

RouterV1.route("/info").get(Controller.retrieveInventoryApiInfo);

RouterV1.route("/search").get(Controller.retrieveInventorySearch);

RouterV1.route("/:id")
  .get(Controller.retrieveInventoryItem)
  .put(Middleware.checkRequestContentType, Controller.replaceInventory)
  .patch(Middleware.checkRequestContentType, Controller.updateInventory)
  .delete(Controller.deleteInventory);

module.exports = RouterV1;
