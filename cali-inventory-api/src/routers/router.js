const express = require("express");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.methodNotAllowed)
  .post(Controller.createInventory);

Router.route("/info").get(Controller.retrieveInventoryApiInfo);

Router.route("/search").get(Controller.retrieveInventorySearch);

Router.route("/:id")
  .get(Controller.retrieveinventoryItem)
  .put(Controller.replaceInventory)
  .patch(Controller.updateInventory)
  .delete(Controller.deleteInventory);

module.exports = { Router };
