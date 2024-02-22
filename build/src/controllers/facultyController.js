"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _facultyService = _interopRequireDefault(require("../services/facultyService"));
var createFaculty = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _facultyService["default"].createFacultyService(req.body);
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
  return function createFaculty(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllFaculty = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _facultyService["default"].fetchAllFacultyService();
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
  return function fetchAllFaculty(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updateFaculty = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _facultyService["default"].updateFacultyService(req.body);
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
  return function updateFaculty(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteFaculty = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _facultyService["default"].deleteFacultyService(req.params.id);
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
  return function deleteFaculty(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
module.exports = {
  createFaculty: createFaculty,
  fetchAllFaculty: fetchAllFaculty,
  updateFaculty: updateFaculty,
  deleteFaculty: deleteFaculty
};