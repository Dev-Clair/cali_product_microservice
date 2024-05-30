const mongoose = require("mongoose");
const slugify = require("slugify");

const inventorySchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      trim: true,
      required: [true, "An inventory must have a name"],
    },
    product_description: {
      type: String,
      trim: true,
      required: [true, "An inventory must have a description"],
    },
    product_slug: {
      type: String,
      unique: true,
    },
    product_price: {
      type: mongoose.Decimal128,
      required: [true, "An inventory must have a price"],
    },
    product_stock_quantity: {
      type: Number,
      required: [true, "An inventory must have a stock_quantity"],
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
      required: [true, "An inventory must have a category"],
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

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = { Inventory };
