"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _postService = _interopRequireDefault(require("../services/postService"));
var createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _postService["default"].createPostService(req.body);
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
  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllPost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _postService["default"].fetchAllPostService();
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
  return function fetchAllPost(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updatePost = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _postService["default"].updatePostService(req.body);
        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(response));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function updatePost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deletePost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _postService["default"].deletePostService(req.params.id);
        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(response));
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log("check e", _context4.t0);
          return _context4.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function deletePost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var fetchMorePost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _postService["default"].fetchMorePostService(req.body);
        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(response));
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function fetchMorePost(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  createPost: createPost,
  fetchAllPost: fetchAllPost,
  updatePost: updatePost,
  deletePost: deletePost,
  fetchMorePost: fetchMorePost
};