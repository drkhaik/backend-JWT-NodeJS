"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/public"));
  app.set("view engine", "ejs"); // jsp blade
  app.set("views", "./src/views");
};
module.exports = configViewEngine;