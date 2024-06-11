const express = require("express");
const Middleware = require("../../middlewares/middleware");
const ControllerV2 = require("../../controllers/v2/inventoryController");

const RouterV2 = express.Router();

RouterV2.route("/")
  .get(ControllerV2.methodNotAllowed)
  .post(Middleware.checkRequestContentType, ControllerV2.createInventory);

RouterV2.route("/info").get(ControllerV2.retrieveInventoryApiInfo);

RouterV2.route("/search").get(ControllerV2.retrieveInventorySearch);

RouterV2.route("/:id")
  .get(ControllerV2.retrieveInventoryItem)
  .put(Middleware.checkRequestContentType, ControllerV2.replaceInventory)
  .patch(Middleware.checkRequestContentType, ControllerV2.updateInventory)
  .delete(ControllerV2.deleteInventory);

module.exports = RouterV2;
