"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Faculty = _interopRequireDefault(require("../models/Faculty"));
var createFacultyService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
              var res;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _Faculty["default"].create({
                      name: data.name
                      // description: data.description,
                    });
                  case 3:
                    res = _context.sent;
                    console.log("check res", res);
                    if (!res && !res._id) {
                      resolve({
                        errCode: 1,
                        message: "Error from server"
                      });
                    }
                    resolve({
                      errCode: 0,
                      message: "OK"
                    });
                    _context.next = 12;
                    break;
                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 9]]);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createFacultyService(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllFacultyService = function fetchAllFacultyService() {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var faculties;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Faculty["default"].find({}).sort({
              createdAt: -1
            }).select({
              __v: 0,
              createdAt: 0,
              updatedAt: 0
            });
          case 3:
            faculties = _context3.sent;
            resolve({
              errCode: 0,
              message: "OK",
              data: faculties
            });
            _context3.next = 10;
            break;
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var updateFacultyService = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve, reject) {
              var faculty;
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return _Faculty["default"].findOne({
                      _id: data._id
                    });
                  case 3:
                    faculty = _context4.sent;
                    if (!faculty) {
                      _context4.next = 11;
                      break;
                    }
                    faculty.name = data.name;
                    // faculty.description = data.description;
                    _context4.next = 8;
                    return _Faculty["default"].updateOne({
                      _id: data._id
                    }, faculty);
                  case 8:
                    resolve({
                      errCode: 0,
                      message: "Ok"
                    });
                    _context4.next = 12;
                    break;
                  case 11:
                    resolve({
                      errCode: 1,
                      message: "The Faculty not found!"
                    });
                  case 12:
                    _context4.next = 17;
                    break;
                  case 14:
                    _context4.prev = 14;
                    _context4.t0 = _context4["catch"](0);
                    reject(_context4.t0);
                  case 17:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[0, 14]]);
            }));
            return function (_x7, _x8) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function updateFacultyService(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteFacultyService = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
              var faculty;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;
                    if (!_id) {
                      resolve({
                        errCode: 2,
                        message: 'Missing required parameters!'
                      });
                    }
                    _context6.next = 4;
                    return _Faculty["default"].findById(_id);
                  case 4:
                    faculty = _context6.sent;
                    if (!faculty) {
                      _context6.next = 11;
                      break;
                    }
                    _context6.next = 8;
                    return _Faculty["default"].deleteOne({
                      _id: _id
                    });
                  case 8:
                    resolve({
                      errCode: 0,
                      message: "OK"
                    });
                    _context6.next = 12;
                    break;
                  case 11:
                    resolve({
                      errCode: 1,
                      message: "The faculty not found!"
                    });
                  case 12:
                    _context6.next = 17;
                    break;
                  case 14:
                    _context6.prev = 14;
                    _context6.t0 = _context6["catch"](0);
                    reject(_context6.t0);
                  case 17:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[0, 14]]);
            }));
            return function (_x10, _x11) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function deleteFacultyService(_x9) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  createFacultyService: createFacultyService,
  fetchAllFacultyService: fetchAllFacultyService,
  updateFacultyService: updateFacultyService,
  deleteFacultyService: deleteFacultyService
};