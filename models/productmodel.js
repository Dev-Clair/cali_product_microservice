const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: [true, "A product must have a product ID"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "A product must have a name"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A product must have a description"],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, "A product must have a slug"],
  },
  price: {
    type: mongoose.Decimal128,
    required: [true, "A product must have a price"],
  },
  status: {
    type: String,
    trim: true,
    required: [true, "A product must have a status"],
  },
  warranty: {
    type: String,
    trim: true,
  },
  colors: [String],
  sizes: [String],
  weight: {
    type: String,
    trim: true,
  },
  image_path: {
    type: String,
    trim: true,
  },
  category: {
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
