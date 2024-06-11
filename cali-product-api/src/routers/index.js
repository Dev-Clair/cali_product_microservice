const express = require("express");

const Router = express.Router();

const RouterV1 = require("./v1/product");

const RouterV2 = require("./v2/product");

Router.use("/v1/products", RouterV1);

Router.use("/v2/products", RouterV2);

module.exports = Router;
