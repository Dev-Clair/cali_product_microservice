const { Inventory } = require("../../models/model");

/**
 * Retrieve information about the inventory API.
 */
const retrieveInventoryApiInfo = (req, res, next) => {
  return res.status(200).json({
    name: "cali_inventory_microservice",
    version: "2.0.0",
    status: "active",
    guide: {
      body: {
        _id,
        product_name,
        product_description,
        product_price,
        product_stock_quantity,
        product_warranty,
        product_colors,
        product_sizes,
        product_weight,
        product_image_path,
        product_category,
      },
      operations: {
        collectionOperations: [
          {
            path: "/api/v2/inventories/",
            allowed: ["POST"],
            notAllowed: ["GET"],
          },
          {
            path: "/api/v2/inventories/search",
            allowed: ["GET"],
            notAllowed: ["POST"],
          },
        ],
        itemOperations: {
          path: "/api/v2/inventories/:id",
          allowed: ["PUT", "PATCH", "DELETE"],
          notAallowed: ["GET"],
        },
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
    await Inventory.create(req.body);

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

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

/**
 * Handle not allowed methods:  Get Collection
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
