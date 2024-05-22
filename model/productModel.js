const mongoose = require("mongoose");
const slugify = require("slugify");

const productschema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: [true, "A product must have a product ID"],
  },
  name: {
    type: String,
    required: [true, "A product must have a name"],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  slug: {
    type: String,
    unique: true,
  },
  price: {
    type: mongoose.Decimal128,
    required: [true, "A product must have a price"],
  },
  status: {
    type: String,
    required: [true, "A product must have a status"],
  },
  warranty: {
    type: String,
  },
  colors: [String],
  sizes: [String],
  weight: {
    type: String,
  },
  image_path: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "A product must have a category"],
  },
  timestamp: true,
});

productschema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const productmodel = mongoose.model("Product", productschema);

module.exports = productmodel;
