const express = require("express");
const productcontroller = require("../controllers/productcontroller");

const productrouter = express.Router();

productrouter.route("/").get(productcontroller.getCollection);

productrouter.route("/search?").get(productcontroller.getSearch);

productrouter.route("/:id").get(productcontroller.get);

module.exports = productrouter();
