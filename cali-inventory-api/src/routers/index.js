const express = require("express");

const Router = express.Router();

const RouterV1 = require("./v1/inventory");

const RouterV2 = require("./v2/inventory");

Router.use("/v1/inventories", RouterV1);

Router.use("/v2/inventories", RouterV2);

module.exports = Router;
