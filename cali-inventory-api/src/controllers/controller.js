const { Inventory } = require("../models/model");
// const { cali_product_queue } = require("../sqs/sqs");

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
 * Transforms message before publishing to queue
 */
const transformInventory = (inventory) => {
  return (product = {
    product_uuid: inventory._id,
    product_name: inventory.product_name,
    product_description: inventory.product_description,
    product_price: inventory.product_price,
    product_stock_quantity: inventory.product_stock_quantity,
    product_warranty: inventory.product_warranty,
    product_colors: inventory.product_colors,
    product_sizes: inventory.product_sizes,
    product_weight: inventory.product_weight,
    product_image_path: inventory.product_image_path,
    product_category: inventory.product_category,
    product_slug: inventory.product_slug,
  });
};

/**
 * Processes message before publishing to queue
 */
const publishInventoryEvent = async (event) => {
  console.log(event);

  // cali_product_queue(message);
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

    publishInventoryEvent(event);

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

    publishInventoryEvent(event);

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

    publishInventoryEvent(event);

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
