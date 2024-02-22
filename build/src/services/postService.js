"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Post = _interopRequireDefault(require("../models/Post"));
var limitNumberOfPost = 5;
var createPostService = /*#__PURE__*/function () {
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
                    return _Post["default"].create({
                      title: data.title,
                      description: data.description,
                      author: data.author
                    });
                  case 3:
                    res = _context.sent;
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
                    _context.next = 11;
                    break;
                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);
                  case 11:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 8]]);
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
  return function createPostService(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllPostService = function fetchAllPostService() {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var posts;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Post["default"].find({}, {
              password: 0
            }).populate('author', 'name image').sort({
              createdAt: -1
            }).limit(limitNumberOfPost).select({
              __v: 0,
              __t: 0
            });
          case 3:
            posts = _context3.sent;
            resolve({
              errCode: 0,
              message: "OK",
              data: posts
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
var fetchMorePostService = function fetchMorePostService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve, reject) {
      var posts;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Post["default"].find({
              _id: {
                $lt: data.lastPostId
              }
            }).populate('author', 'name image').sort({
              createdAt: -1
            }).limit(limitNumberOfPost).select({
              __v: 0,
              __t: 0
              // _id: false,
              // createdAt: false,
              // updatedAt: false,
            });
          case 3:
            posts = _context4.sent;
            // console.log("check post list", posts);
            resolve({
              errCode: 0,
              message: "OK",
              data: posts
            });
            _context4.next = 10;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 7]]);
    }));
    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var updatePostService = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
              var post;
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 3;
                    return _Post["default"].findOne({
                      _id: data._id
                    });
                  case 3:
                    post = _context5.sent;
                    if (!post) {
                      _context5.next = 12;
                      break;
                    }
                    post.title = data.title;
                    post.description = data.description;
                    _context5.next = 9;
                    return _Post["default"].updateOne({
                      _id: data._id
                    }, post);
                  case 9:
                    resolve({
                      errCode: 0,
                      message: "Ok"
                    });
                    _context5.next = 13;
                    break;
                  case 12:
                    resolve({
                      errCode: 2,
                      message: "The Post not found!"
                    });
                  case 13:
                    _context5.next = 18;
                    break;
                  case 15:
                    _context5.prev = 15;
                    _context5.t0 = _context5["catch"](0);
                    reject(_context5.t0);
                  case 18:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 15]]);
            }));
            return function (_x9, _x10) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updatePostService(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var deletePostService = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_id) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve, reject) {
              var post;
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    if (!_id) {
                      resolve({
                        errCode: 2,
                        message: 'Missing required parameters!'
                      });
                    }
                    _context7.next = 4;
                    return _Post["default"].findById(_id);
                  case 4:
                    post = _context7.sent;
                    if (!post) {
                      _context7.next = 11;
                      break;
                    }
                    _context7.next = 8;
                    return _Post["default"].deleteOne({
                      _id: _id
                    });
                  case 8:
                    resolve({
                      errCode: 0,
                      message: "OK"
                    });
                    _context7.next = 12;
                    break;
                  case 11:
                    resolve({
                      errCode: 1,
                      message: "The post not found!"
                    });
                  case 12:
                    _context7.next = 17;
                    break;
                  case 14:
                    _context7.prev = 14;
                    _context7.t0 = _context7["catch"](0);
                    reject(_context7.t0);
                  case 17:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 14]]);
            }));
            return function (_x12, _x13) {
              return _ref8.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deletePostService(_x11) {
    return _ref7.apply(this, arguments);
  };
}();
module.exports = {
  createPostService: createPostService,
  fetchAllPostService: fetchAllPostService,
  updatePostService: updatePostService,
  deletePostService: deletePostService,
  fetchMorePostService: fetchMorePostService
};