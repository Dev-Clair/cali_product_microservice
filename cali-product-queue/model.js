const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    product_uuid: {
      type: String,
      required: [true, "A product must have a tracking uuid"],
      unique: true,
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
    },
    product_price: {
      type: mongoose.Decimal128,
      required: [true, "A product must have a price"],
    },
    product_stock_quantity: {
      type: Number,
      required: [true, "A product must have a stock_quantity"],
      select: true,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document Middleware
productSchema.pre("save", function (next) {
  if (this.product_name) {
    this.product_slug = slugify(this.product_name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
