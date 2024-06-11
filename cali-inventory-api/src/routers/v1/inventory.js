const express = require("express");
const Middleware = require("../../middlewares/middleware");
const ControllerV1 = require("../../controllers/v1/inventoryController");

const RouterV1 = express.Router();

RouterV1.route("/")
  .get(ControllerV1.methodNotAllowed)
  .post(Middleware.checkRequestContentType, ControllerV1.createInventory);

RouterV1.route("/info").get(ControllerV1.retrieveInventoryApiInfo);

RouterV1.route("/search").get(ControllerV1.retrieveInventorySearch);

RouterV1.route("/:id")
  .get(ControllerV1.retrieveInventoryItem)
  .put(Middleware.checkRequestContentType, ControllerV1.replaceInventory)
  .patch(Middleware.checkRequestContentType, ControllerV1.updateInventory)
  .delete(ControllerV1.deleteInventory);

module.exports = RouterV1;
