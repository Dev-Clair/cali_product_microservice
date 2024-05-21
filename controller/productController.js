const express = require("express");
const productmodel = require("./../model/productmodel");

const app = express();

/**
 * Collection Operations
 */
exports.getProducts = (req, res) => {
  // Retrieves product collection
  productmodel;
};

exports.postProduct = (req, res) => {
  // Creates a new product
  productmodel;
};

/**
 * Item Operations
 */
exports.getProduct = (req, res) => {
  // Retrieves an existing product using its :id / :slug
  productmodel;
};

exports.putProduct = (req, res) => {
  // Modifies an existing product (entirely) using its :id / :slug
  productmodel;
};

exports.patchProduct = (req, res) => {
  // Modifies an existing product (partially) using its :id / :slug
  productmodel;
};

exports.deleteProduct = (req, res) => {
  // Removes an existing product using its :id / :slug
  productmodel;
};

/**
 * User-Defined Operations
 */
exports.getSearchProduct = (req, res) => {
  // Retrieves an existing or collection of products based on search parameter
  productmodel;
};
