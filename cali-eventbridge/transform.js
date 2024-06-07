/**
 * Transforms event before processing
 */
const transform = (inventory) => {
  const product = {
    product_uuid: inventory._id,
  };

  if (inventory.product_name !== undefined)
    product.product_name = inventory.product_name;

  if (inventory.product_description !== undefined)
    product.product_description = inventory.product_description;

  if (inventory.product_price !== undefined)
    product.product_price = inventory.product_price;

  if (inventory.product_stock_quantity !== undefined)
    product.product_stock_quantity = inventory.product_stock_quantity;

  if (inventory.product_warranty !== undefined)
    product.product_warranty = inventory.product_warranty;

  if (inventory.product_colors !== undefined)
    product.product_colors = inventory.product_colors;

  if (inventory.product_sizes !== undefined)
    product.product_sizes = inventory.product_sizes;

  if (inventory.product_weight !== undefined)
    product.product_weight = inventory.product_weight;

  if (inventory.product_image_path !== undefined)
    product.product_image_path = inventory.product_image_path;

  if (inventory.product_category !== undefined)
    product.product_category = inventory.product_category;

  if (inventory.product_slug !== undefined)
    product.product_slug = inventory.product_slug;

  return product;
};

module.exports = transform;
