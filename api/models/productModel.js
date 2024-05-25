const mongoose = require("mongoose");
const productSchema = require("../../schemas/productSchema");

const productModel = mongoose.model("ProductModel", productSchema);

module.exports = productModel;
