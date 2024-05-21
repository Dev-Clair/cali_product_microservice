const express = require("express");
const productcontroller = require("./../controller/productcontroller");

const router = express.Router();

router.route("/").get(productcontroller.getCollection);

router.route("/?prop=:val").get(productcontroller.search);

router.route("/:id").get(productcontroller.get);

module.exports = productrouter();
