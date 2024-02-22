"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Message = _interopRequireDefault(require("../models/Message"));
var limitNumberOfMessage = 20;
var fetchMessageHistoryService = function fetchMessageHistoryService(conversationId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var messageList;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Message["default"].find({
              conversation: conversationId
            }).sort({
              createdAt: -1
            }).limit(limitNumberOfMessage).select({
              updatedAt: 0,
              __v: 0,
              __t: 0,
              public_id: 0
            });
          case 3:
            messageList = _context.sent;
            // messageList.reverse();
            // console.log("check message list initial", messageList);
            // return;
            resolve({
              errCode: 0,
              message: "OK",
              data: messageList
            });
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var fetchMoreMessageService = function fetchMoreMessageService(_ref2) {
  var conversationId = _ref2.conversationId,
    lastMessageId = _ref2.lastMessageId;
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      var messageList;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Message["default"].find({
              conversation: conversationId,
              _id: {
                $lt: lastMessageId
              }
            }).sort({
              createdAt: -1
            }).limit(limitNumberOfMessage).select({
              __v: false,
              // _id: false,
              // createdAt: false,
              updatedAt: false
            });
          case 3:
            messageList = _context2.sent;
            // console.log("check message list", messageList);
            // return;
            resolve({
              errCode: 0,
              message: "OK",
              data: messageList
            });
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
};
module.exports = {
  fetchMessageHistoryService: fetchMessageHistoryService,
  fetchMoreMessageService: fetchMoreMessageService
};