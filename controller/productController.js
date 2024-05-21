const express = require("express");
const productmodel = require("./../model/productmodel");

/**
 * Collection Operations
 */
exports.getCollection = (req, res) => {
  // Retrieves product collection
  productmodel.find();
};

exports.post = () => {
  // Creates a new product
  productmodel.create();
};

/**
 * Item Operations
 */
exports.get = (req, res) => {
  // Retrieves an existing product using its :id / :slug
  productmodel.findOne();
};

exports.put = () => {
  // Modifies an existing product (entirely) using its :id / :slug
  productmodel.findByIdAndUpdate();
};

exports.patch = () => {
  // Modifies an existing product (partially) using its :id / :slug
  productmodel.findByIdAndUpdate();
};

exports.delete = () => {
  // Removes an existing product using its :id / :slug
  productmodel.findByIdAndDelete();
};

/**
 * Hybrid Operations
 */
exports.search = (req, res) => {
  // Retrieves an existing or collection of products based on search parameter
  productmodel.find();
};
