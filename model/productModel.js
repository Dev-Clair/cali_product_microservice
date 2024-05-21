const mongoose = require("mongoose");

const productschema = new mongoose.Schema({});

const productmodel = mongoose.model("Product", productschema);

module.exports = productmodel;
