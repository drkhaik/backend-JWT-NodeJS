"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _conversationService = _interopRequireDefault(require("../services/conversationService"));
var createConversation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _conversationService["default"].createConversationService(req.body);
        case 3:
          response = _context.sent;
          return _context.abrupt("return", res.status(200).json(response));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createConversation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fetchConversationByUserId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _conversationService["default"].fetchConversationByUserIdService(req.params.id);
        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(response));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function fetchConversationByUserId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  createConversation: createConversation,
  fetchConversationByUserId: fetchConversationByUserId
};