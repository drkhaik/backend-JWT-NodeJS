"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _messageController = _interopRequireDefault(require("../controllers/messageController"));
var router = _express["default"].Router();
router.get('/message/history/:id', _messageController["default"].fetchMessageHistory);
router.post('/message/history', _messageController["default"].fetchMoreMessageHistoryByLastMessageId);
var _default = exports["default"] = router;