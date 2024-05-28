const express = require("express");
const Controller = require("../controllers/controller");

const Router = express.Router();

Router.route("/")
  .get(Controller.retrieveCollection)
  .post(Controller.methodNotAllowed);

Router.route("/info").get(Controller.retrieveInfo);

Router.route("/search?q=").get(Controller.retrieveSearch);

Router.route("/:id")
  .get(Controller.retrieveItem)
  .put(Controller.methodNotAllowed)
  .patch(Controller.methodNotAllowed)
  .delete(Controller.methodNotAllowed);

module.exports = { Router };
