const express = require("express");

const Router = express.Router();

const inventoryV1 = require("./v1/inventory");

const inventoryV2 = require("./v2/inventory");

Router.use("/v1/inventories", inventoryV1);

Router.use("/v2/inventories", inventoryV2);

module.exports = Router;
