const express = require("express");
const productmodel = require("./../model/productmodel");

const app = express();

/**
 * Collection Operations
 */
exports.getCollection = (req, res) => {
  // Retrieves product collection
  productmodel;
};

exports.post = () => {
  // Creates a new product
  productmodel;
};

/**
 * Item Operations
 */
exports.get = (req, res) => {
  // Retrieves an existing product using its :id / :slug
  productmodel;
};

exports.put = () => {
  // Modifies an existing product (entirely) using its :id / :slug
  productmodel;
};

exports.patch = () => {
  // Modifies an existing product (partially) using its :id / :slug
  productmodel;
};

exports.delete = () => {
  // Removes an existing product using its :id / :slug
  productmodel;
};

/**
 * Hybrid Operations
 */
exports.search = (req, res) => {
  // Retrieves an existing or collection of products based on search parameter
  productmodel;
};
