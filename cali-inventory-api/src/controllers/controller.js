const { Inventory } = require("../models/model");
const { SQS } = require("../sqs/sqs");

/**
 * Retrieve information about the inventory API.
 */
const retrieveInventoryApiInfo = (req, res, next) => {
  res.status(200).json({
    name: "cali_inventory_microservice",
    version: "1.0.0",
    status: active,
    collection_operations: [
      {
        path: "api/v1/inventories/",
        allowed: ["POST"],
        not_allowed: ["GET"],
      },
      {
        path: "api/v1/inventories/search",
        allowed: ["GET"],
        not_allowed: ["POST"],
      },
    ],
    item_operations: {
      path: "api/v1/inventories/:id",
      allowed: ["PUT", "PATCH", "DELETE"],
      not_allowed: ["GET"],
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

    res.status(200).json({
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

    res.status(200).json({ inventory: inventory });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieve inventory collection.
 */
const createInventory = async (req, res, next) => {
  try {
    const inventory = req.params.body;

    const inventories = await Inventory.create(inventory);

    res.status(201).json({
      status: "Created",
      message: "New Item added to inventory collection",
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
    const inventory = await Inventory.findOneAndReplace(
      { _id: req.params.id },
      req.params.body
    );

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `No item found for inventory id: ${req.params.id}` });
    }

    res.status(200).json({
      status: "Modified",
      message: `Item with id: ${req.params.id} modified`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Modify an existing inventory partially using its :id / :slug.
 */
const updateInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findOneAndUpdate(
      { _id: req.params.id },
      req.params.body
    );

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `No item found for inventory id: ${req.params.id}` });
    }

    res.status(200).json({
      status: "Modified",
      message: `Item with id: ${req.params.id} modified`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete an inventory using its :id / :slug.
 */
const deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findOneAndDelete({ _id: req.params.id });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `No item found for inventory id: ${req.params.id}` });
    }

    res.status(204).json({
      status: "Deleted",
      message: `Item with id: ${req.params.id} deleted`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Handle not allowed methods: GET
 */
const methodNotAllowed = (req, res) => {
  res.status(405).json({ message: "Method Not Allowed" });
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
