"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _conversationController = _interopRequireDefault(require("../controllers/conversationController"));
var router = _express["default"].Router();
router.post('/conversation/', _conversationController["default"].createConversation);
router.get('/conversation/:id', _conversationController["default"].fetchConversationByUserId);
var _default = exports["default"] = router;