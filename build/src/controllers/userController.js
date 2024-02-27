"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userService = _interopRequireDefault(require("../services/userService"));
var handleLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, password, _response$data, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          if (!(!email || !password)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters!'
          }));
        case 4:
          _context.prev = 4;
          _context.next = 7;
          return _userService["default"].handleLoginService(email, password);
        case 7:
          response = _context.sent;
          if (response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.access_token) {
            res.cookie("jwt", response.data.access_token, {
              httpOnly: true,
              maxAge: 60 * 60 * 1000,
              secure: true,
              sameSite: 'false'
            });
          }
          // console.log("check response", response);
          return _context.abrupt("return", res.status(200).json(response));
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", res.status(200).json({
            errCode: -1
            // message: res.message,
          }));
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 12]]);
  }));
  return function handleLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleGoogleLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, _response$data2, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          user = req.user;
          if (user) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters!'
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _userService["default"].handleLoginGoogleService(user._id);
        case 6:
          response = _context2.sent;
          if (response !== null && response !== void 0 && (_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.access_token) {
            res.cookie("jwt", response.data.access_token,
            // { httpOnly: true, maxAge: 60 * 60 * 1000, secure: true });
            {
              httpOnly: true,
              maxAge: 60 * 60 * 1000,
              secure: true,
              sameSite: 'false'
            });
          }
          return _context2.abrupt("return", res.status(200).json(response));
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", res.status(200).json({
            errCode: -1
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 11]]);
  }));
  return function handleGoogleLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var handleGoogleLoginDepartment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, _response$data3, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          user = req.user;
          if (user) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters!'
          }));
        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return _userService["default"].handleLoginGoogleDepartmentService(user._id);
        case 6:
          response = _context3.sent;
          if (response !== null && response !== void 0 && (_response$data3 = response.data) !== null && _response$data3 !== void 0 && _response$data3.access_token) {
            res.cookie("jwt", response.data.access_token,
            // { httpOnly: true, maxAge: 60 * 60 * 1000, secure: true });
            {
              httpOnly: true,
              maxAge: 60 * 60 * 1000,
              secure: true,
              sameSite: 'false'
            });
          }
          return _context3.abrupt("return", res.status(200).json(response));
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](3);
          return _context3.abrupt("return", res.status(200).json({
            errCode: -1
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 11]]);
  }));
  return function handleGoogleLoginDepartment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var fetchAccount = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$tokenDecoded, id, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req !== null && req !== void 0 && (_req$tokenDecoded = req.tokenDecoded) !== null && _req$tokenDecoded !== void 0 && _req$tokenDecoded.user ? req.tokenDecoded.user._id : null;
          if (!(id === null)) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return");
        case 4:
          _context4.next = 6;
          return _userService["default"].fetchAccountService(id);
        case 6:
          response = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            errCode: 0,
            message: "Ok",
            data: {
              user: response,
              token: req.token
            }
          }));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log("check err", _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function fetchAccount(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var handleLogout = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          res.clearCookie("jwt", {
            httpOnly: true,
            secure: true
          });
          res.clearCookie("express:sess", {
            httpOnly: true,
            secure: true
          });
          res.clearCookie("express:sess.sig", {
            httpOnly: true,
            secure: true
          });
          return _context5.abrupt("return", res.status(200).json({
            errCode: 0,
            message: "Ok"
          }));
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function handleLogout(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var fetchAllUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _userService["default"].fetchAllUser();
        case 3:
          response = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(response));
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function fetchAllUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var fetchUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _userService["default"].getUserById(req.params.id);
        case 3:
          response = _context7.sent;
          return _context7.abrupt("return", res.status(200).json(response));
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function fetchUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var createNewUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _userService["default"].createUserService(req.body);
        case 3:
          response = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(response));
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function createNewUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _userService["default"].updateUserService(req.body);
        case 3:
          response = _context9.sent;
          return _context9.abrupt("return", res.status(200).json(response));
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function updateUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var changeUserPassword = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _userService["default"].changeUserPasswordService(req.body);
        case 3:
          response = _context10.sent;
          return _context10.abrupt("return", res.status(200).json(response));
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function changeUserPassword(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var changeFaculty = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _userService["default"].changeUserFacultyService(req.body);
        case 3:
          response = _context11.sent;
          return _context11.abrupt("return", res.status(200).json(response));
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function changeFaculty(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _userService["default"].deleteUserService(req.params.id);
        case 3:
          response = _context12.sent;
          return _context12.abrupt("return", res.status(200).json(response));
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function deleteUser(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var getAllRole = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _userService["default"].getAllRoleService();
        case 3:
          response = _context13.sent;
          return _context13.abrupt("return", res.status(200).json(response));
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          return _context13.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function getAllRole(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var fetchDepartmentUser = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _userService["default"].fetchDepartmentUserService(req.params.id);
        case 3:
          response = _context14.sent;
          return _context14.abrupt("return", res.status(200).json(response));
        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", res.status(200).json({
            errCode: -1,
            message: "Error from server..."
          }));
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return function fetchDepartmentUser(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
module.exports = {
  handleLogin: handleLogin,
  handleGoogleLogin: handleGoogleLogin,
  handleGoogleLoginDepartment: handleGoogleLoginDepartment,
  fetchAccount: fetchAccount,
  handleLogout: handleLogout,
  fetchAllUser: fetchAllUser,
  fetchUser: fetchUser,
  createNewUser: createNewUser,
  updateUser: updateUser,
  changeUserPassword: changeUserPassword,
  changeFaculty: changeFaculty,
  deleteUser: deleteUser,
  getAllRole: getAllRole,
  fetchDepartmentUser: fetchDepartmentUser
};