const Product = require("./model");
const getDbConnection = require("./connection");

getDbConnection;

exports.inventoryBus = async (event) => {
  let payload;

  payload = JSON.parse(event.detail);

  const {
    operationType: operation,
    fullDocument: product,
    documentKey: productKey,
  } = payload;

  switch (operation) {
    case "insert":
      await insertProduct(product);
      break;

    case "replace":
      await replaceProduct(product);
      break;

    case "update":
      await updateProduct(product);
      break;

    case "delete":
      await deleteProduct(productKey);
      break;

    default:
      console.error(
        `Invalid operation: ${operation} | Resource: ${
          product?.product_name || "Unknown"
        }`
      );
      break;
  }
};

const insertProduct = async (product) => {
  try {
    const newProduct = await Product.create(product);
    console.log(
      `INSERT: Success | RESOURCE UUID: ${newProduct.product_uuid} | RESOURCE NAME: ${newProduct.product_name}.`
    );
  } catch (err) {
    console.error(`INSERT: Failure | ERROR: ${err.message}`);
  }
};

const replaceProduct = async (product) => {
  try {
    const replacedProduct = await Product.findOneAndReplace(
      { product_uuid: product.product_uuid },
      product
    );
    console.log(
      `REPLACE: Success | RESOURCE UUID: ${replacedProduct.product_uuid} | RESOURCE NAME: ${replacedProduct.product_name}.`
    );
  } catch (err) {
    console.error(`REPLACE: Failure | ERROR: ${err.message}`);
  }
};

const updateProduct = async (product) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_uuid: product.product_uuid },
      product,
      { new: true }
    );
    console.log(
      `UPDATE: Success | RESOURCE UUID: ${updatedProduct.product_uuid} | RESOURCE NAME: ${updatedProduct.product_name}.`
    );
  } catch (err) {
    console.error(`UPDATE: Failure | ERROR: ${err.message}`);
  }
};

const deleteProduct = async (productKey) => {
  try {
    await Product.findOneAndDelete({ product_uuid: productKey });
    console.log(`DELETE: Success | RESOURCE UUID: ${productKey}.`);
  } catch (err) {
    console.error(`DELETE: Failure | ERROR: ${err.message}`);
  }
};
