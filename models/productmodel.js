const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: [true, "A product must have a product ID"],
  },
  product_name: {
    type: String,
    trim: true,
    required: [true, "A product must have a name"],
  },
  product_description: {
    type: String,
    trim: true,
    required: [true, "A product must have a description"],
  },
  product_slug: {
    type: String,
    unique: true,
    required: [true, "A product must have a slug"],
  },
  product_price: {
    type: mongoose.Decimal128,
    required: [true, "A product must have a price"],
  },
  product_stock_quantity: {
    type: Number,
    required: [true, "A product must have a stock_quantity"],
  },
  product_status: {
    type: String,
    trim: true,
    required: [true, "A product must have a status"],
  },
  product_warranty: {
    type: String,
    trim: true,
  },
  product_colors: [String],
  product_sizes: [String],
  product_weight: {
    type: String,
    trim: true,
  },
  product_image_path: {
    type: String,
    trim: true,
  },
  product_category: {
    type: String,
    trim: true,
    required: [true, "A product must have a category"],
  },
});

productSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
