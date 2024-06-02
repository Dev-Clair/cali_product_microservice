const { Inventory } = require("../models/model");
const { AWS_SQS } = require("../sqs/sqs");

/**
 * Transforms message before publishing to queue
 */
const transformInventory = (inventory) => {
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

/**
 * Publish event to queue
 */
const publishInventoryEvent = async (event) => {
  AWS_SQS(event);
};

/**
 * Retrieve information about the inventory API.
 */
const retrieveInventoryApiInfo = (req, res, next) => {
  return res.status(200).json({
    name: "cali_inventory_microservice",
    version: "1.0.0",
    status: "active",
    guide: {
      collection_operations: [
        {
          path: "/api/v1/inventories/",
          allowed: ["POST"],
          not_allowed: ["GET"],
        },
        {
          path: "/api/v1/inventories/search",
          allowed: ["GET"],
          not_allowed: ["POST"],
        },
      ],
      item_operations: {
        path: "/api/v1/inventories/:id",
        allowed: ["PUT", "PATCH", "DELETE"],
        not_allowed: ["GET"],
      },
    },
  });
};

/**
 * Retrieve an existing or collection of inventories based on search parameter.
 */
const retrieveInventorySearch = async (req, res, next) => {
  try {
    const inventories = await Inventory.find({
      $text: { $search: req.query.q, $caseSensitive: false },
    });

    if (!inventories) {
      return res
        .status(404)
        .json({ message: `No inventories found for query: ${req.query.q}` });
    }

    return res.status(200).json({
      count: inventories.length,
      inventories: inventories,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieve an inventory item using its :id / :slug.
 */
const retrieveInventoryItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById({ _id: req.params.id });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `No item found for inventory id: ${req.params.id}` });
    }

    return res.status(200).json({ inventory: inventory });
  } catch (err) {
    next(err);
  }
};

/**
 * Create inventory collection.
 */
const createInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.create(req.body);

    // Publish create event to queue
    const event = {
      operation: "POST",
      product: transformInventory(inventory),
    };

    publishInventoryEvent(event);

    // Send http response
    return res.status(201).json({
      message: "New item added to inventory collection",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Modify an existing inventory entirely using its :id / :slug.
 */
const replaceInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({
        message: `No item found for inventory id: ${req.params.id}`,
      });
    }

    // Publish put event to queue
    const event = {
      operation: "PUT",
      product: transformInventory(inventory),
    };

    await publishInventoryEvent(event);

    // Send http response
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

/**
 * Modify an existing inventory partially using its :id / :slug.
 */
const updateInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({
        message: `No item found for inventory id: ${req.params.id}`,
      });
    }

    // Publish patch event to queue
    const event = {
      operation: "PATCH",
      product: transformInventory(inventory),
    };

    await publishInventoryEvent(event);

    // Send http response
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

/**
 * Delete an inventory using its :id / :slug.
 */
const deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndDelete({ _id: req.params.id });

    if (!inventory) {
      return res.status(404).json({
        message: `No item found for inventory id: ${req.params.id}`,
      });
    }

    // Publish delete event to queue
    const event = {
      operation: "DELETE",
      product: transformInventory(inventory._id),
    };

    await publishInventoryEvent(event);

    // Send http response
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

/**
 * Handle not allowed methods: GET
 */
const methodNotAllowed = (req, res) => {
  return res.status(405).json({
    message: "Cannot retrieve inventory resource",
  });
};

module.exports = {
  retrieveInventoryApiInfo,
  retrieveInventorySearch,
  retrieveInventoryItem,
  createInventory,
  replaceInventory,
  updateInventory,
  deleteInventory,
  methodNotAllowed,
};
