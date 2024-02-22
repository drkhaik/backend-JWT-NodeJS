"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _JWTAction = require("../middleware/JWTAction");
var _upload = _interopRequireDefault(require("./upload"));
var _user = _interopRequireDefault(require("./user"));
var _conversation = _interopRequireDefault(require("./conversation"));
var _message = _interopRequireDefault(require("./message"));
var _post = _interopRequireDefault(require("./post"));
var _faculty = _interopRequireDefault(require("./faculty"));
var router = _express["default"].Router();
var initApiRoutes = function initApiRoutes(app) {
  router.all('*', _JWTAction.checkTokenJWT);
  router.use(_user["default"]);
  router.use(_conversation["default"]);
  router.use(_message["default"]);
  router.use(_post["default"]);
  router.use(_upload["default"]);
  router.use(_faculty["default"]);
  return app.use("/api/v1", router);
};
module.exports = initApiRoutes;