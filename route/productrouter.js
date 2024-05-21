const express = require("express");
const productcontroller = require("../controller/productcontroller");

const router = express.Router();

router.route("/").get(productcontroller.getProducts);

router.route("/?prop=:val").get(productcontroller.getSearchProduct);

router.route("/:id").get(productcontroller.getProduct);

module.exports = productrouter();
