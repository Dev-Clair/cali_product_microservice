const mongoose = require("mongoose");
const productSchema = require("../../schemas/productSchema");

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
