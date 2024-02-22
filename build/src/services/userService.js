"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _User = _interopRequireDefault(require("../models/User"));
var _Role = _interopRequireDefault(require("../models/Role"));
var _Conversation = _interopRequireDefault(require("../models/Conversation"));
var _Message = _interopRequireDefault(require("../models/Message"));
var _JWTService = require("./JWTService");
var _JWTAction = require("../middleware/JWTAction");
var _cloudinaryUtils = require("../utils/cloudinaryUtils");
var _lodash = _interopRequireDefault(require("lodash"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var salt = _bcryptjs["default"].genSaltSync(10);

// let checkUserEmail = (userEmail) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await User.findOne({ email: userEmail });
//             if (user) {
//                 resolve(true)
//             } else {
//                 resolve(false)
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

var checkUserEmailOrStudentId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emailOrStudentId) {
    var email, studentId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _User["default"].findOne({
            email: emailOrStudentId
          });
        case 2:
          email = _context.sent;
          _context.next = 5;
          return _User["default"].findOne({
            studentId: emailOrStudentId
          });
        case 5:
          studentId = _context.sent;
          return _context.abrupt("return", email || studentId);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function checkUserEmailOrStudentId(_x) {
    return _ref.apply(this, arguments);
  };
}();
var hashUserPassword = function hashUserPassword(password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      var hashPassword;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bcryptjs["default"].hashSync(password, salt);
          case 3:
            hashPassword = _context2.sent;
            resolve(hashPassword);
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
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var handleLoginGoogleService = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id) {
    var studentRole, user, userFromDB, payload, token, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Role["default"].findOne({
            name: 'Student'
          });
        case 3:
          studentRole = _context3.sent;
          if (studentRole) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return");
        case 6:
          user = {};
          _context3.next = 9;
          return _User["default"].findOne({
            _id: _id
          }).select({
            public_id: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            googleId: 0,
            password: 0
          });
        case 9:
          userFromDB = _context3.sent;
          if (!userFromDB) {
            _context3.next = 16;
            break;
          }
          user = _objectSpread(_objectSpread({}, userFromDB._doc), {}, {
            roleID: studentRole._id
          });
          _context3.next = 14;
          return _User["default"].updateOne({
            _id: user._id
          }, user);
        case 14:
          user.roleID = studentRole._id;
          user.role = studentRole.name;
        case 16:
          payload = {
            user: user
          };
          token = (0, _JWTAction.createTokenJWT)(payload);
          response = {
            errCode: 0,
            message: "Ok",
            data: {
              access_token: token,
              user: user
            }
          };
          return _context3.abrupt("return", response);
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function handleLoginGoogleService(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var handleLoginGoogleDepartmentService = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user) {
    var departmentRole, _user, userFromDB, payload, token, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Role["default"].findOne({
            name: 'Department'
          });
        case 3:
          departmentRole = _context4.sent;
          if (departmentRole) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return");
        case 6:
          _user = {};
          _context4.next = 9;
          return _User["default"].findOne({
            _id: _id
          }).select({
            public_id: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            googleId: 0,
            password: 0
          });
        case 9:
          userFromDB = _context4.sent;
          if (!userFromDB) {
            _context4.next = 16;
            break;
          }
          _user = _objectSpread(_objectSpread({}, userFromDB._doc), {}, {
            roleID: departmentRole._id
          });
          _context4.next = 14;
          return _User["default"].updateOne({
            _id: _user._id
          }, _user);
        case 14:
          _user.roleID = departmentRole._id;
          _user.role = departmentRole.name;
        case 16:
          payload = {
            user: _user
          };
          token = (0, _JWTAction.createTokenJWT)(payload);
          response = {
            errCode: 0,
            message: "Ok",
            data: {
              access_token: token,
              user: _user
            }
          };
          return _context4.abrupt("return", response);
        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 22]]);
  }));
  return function handleLoginGoogleDepartmentService(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var handleLoginService = function handleLoginService(email, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
      var response, isExist, userFromDB, isPasswordCorrect, role, user, payload, token;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            response = {};
            _context5.next = 4;
            return checkUserEmailOrStudentId(email);
          case 4:
            isExist = _context5.sent;
            if (!isExist) {
              _context5.next = 35;
              break;
            }
            _context5.next = 8;
            return _User["default"].findOne({
              email: email
            }).select({
              public_id: 0,
              __v: 0,
              createdAt: 0,
              updatedAt: 0
            });
          case 8:
            userFromDB = _context5.sent;
            if (!userFromDB) {
              _context5.next = 31;
              break;
            }
            _context5.next = 12;
            return _bcryptjs["default"].compareSync(password, userFromDB.password);
          case 12:
            isPasswordCorrect = _context5.sent;
            if (!isPasswordCorrect) {
              _context5.next = 27;
              break;
            }
            _context5.next = 16;
            return (0, _JWTService.getRole)(userFromDB);
          case 16:
            role = _context5.sent;
            user = _objectSpread({}, userFromDB._doc);
            user.role = role.name;
            delete user.password;
            payload = {
              user: user
            };
            token = (0, _JWTAction.createTokenJWT)(payload);
            response.errCode = 0;
            response.message = "Ok";
            response.data = {
              access_token: token,
              user: user
            };
            _context5.next = 29;
            break;
          case 27:
            response.errCode = 3;
            response.message = "Wrong password!";
          case 29:
            _context5.next = 33;
            break;
          case 31:
            response.errCode = 2;
            response.message = "User not found";
          case 33:
            _context5.next = 37;
            break;
          case 35:
            response.errCode = 1;
            response.message = "Your Email or Student Id isn't exist in your system. Plz try the other one!";
          case 37:
            resolve(response);
            _context5.next = 43;
            break;
          case 40:
            _context5.prev = 40;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 43:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 40]]);
    }));
    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var fetchAccountService = function fetchAccountService(_id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
      var user, userFromDB, role;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            user = {};
            _context6.next = 4;
            return _User["default"].findOne({
              _id: _id
            }).select({
              public_id: 0,
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
              googleId: 0,
              password: 0
            });
          case 4:
            userFromDB = _context6.sent;
            if (!userFromDB) {
              _context6.next = 10;
              break;
            }
            _context6.next = 8;
            return (0, _JWTService.getRole)(userFromDB);
          case 8:
            role = _context6.sent;
            user = _objectSpread(_objectSpread({}, userFromDB._doc), {}, {
              role: role.name
            });
          case 10:
            resolve(user);
            _context6.next = 16;
            break;
          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 16:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 13]]);
    }));
    return function (_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var fetchAllUser = function fetchAllUser() {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve, reject) {
      var users;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _User["default"].find({}, {
              password: 0
            }).populate('roleID', 'name');
          case 3:
            users = _context7.sent;
            resolve({
              errCode: 0,
              message: "OK",
              data: users
            });
            _context7.next = 10;
            break;
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 7]]);
    }));
    return function (_x10, _x11) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getUserById = function getUserById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(resolve, reject) {
      var user;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _User["default"].findOne({
              // raw: true,
              _id: id
            });
          case 3:
            user = _context8.sent;
            // users.get({ plain: true });
            resolve({
              errCode: 0,
              message: "OK",
              data: user
            });
            _context8.next = 10;
            break;
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 7]]);
    }));
    return function (_x12, _x13) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var checkRequiredFields = function checkRequiredFields(data) {
  var arrField = ['doctorId', 'contentHTML', 'contentMarkdown', 'actions', 'description', 'selectedPrice', 'selectedPayment', 'selectedProvince', 'note', 'specialtyId', 'clinicId'];
  var isValid = true,
    element = '';
  for (var i = 0; i < arrField.length; i++) {
    if (!data[arrField[i]]) {
      isValid = false;
      element = arrField[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element
  };
};
var createUserService = function createUserService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve, reject) {
      var isExist, hashPasswordFromBcrypt, res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return checkUserEmail(data.email);
          case 3:
            isExist = _context9.sent;
            if (!isExist) {
              _context9.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              message: "Email already exists!"
            });
            _context9.next = 15;
            break;
          case 8:
            _context9.next = 10;
            return hashUserPassword(data.password);
          case 10:
            hashPasswordFromBcrypt = _context9.sent;
            _context9.next = 13;
            return _User["default"].create({
              name: data.name,
              email: data.email,
              password: hashPasswordFromBcrypt,
              description: data.description,
              image: data.image,
              public_id: data.public_id,
              roleID: data.roleID,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          case 13:
            res = _context9.sent;
            resolve({
              errCode: 0,
              message: "OK"
            });
          case 15:
            _context9.next = 20;
            break;
          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9["catch"](0);
            // console.log("check error", e);
            reject(_context9.t0);
          case 20:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 17]]);
    }));
    return function (_x14, _x15) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var updateUserService = function updateUserService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(resolve, reject) {
      var user;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!data._id) {
              resolve({
                errCode: 2,
                message: 'Missing required parameters!'
              });
            }
            _context10.next = 4;
            return _User["default"].findOne({
              _id: data._id
            });
          case 4:
            user = _context10.sent;
            if (!user) {
              _context10.next = 17;
              break;
            }
            user.name = data.name;
            user.description = data.description;
            user.image = data.image;
            user.public_id = data.public_id;
            user.roleID = data.roleID;
            user.updatedAt = new Date();
            // await user.save(); // lưu 1 đối tượng ko quan tâm đã có hay chưa
            _context10.next = 14;
            return _User["default"].updateOne({
              _id: data._id
            }, user);
          case 14:
            resolve({
              errCode: 0,
              message: "Ok"
            });
            _context10.next = 18;
            break;
          case 17:
            resolve({
              errCode: 1,
              message: "The User not found!"
            });
          case 18:
            _context10.next = 23;
            break;
          case 20:
            _context10.prev = 20;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 23:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 20]]);
    }));
    return function (_x16, _x17) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var changeUserPasswordService = function changeUserPasswordService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve, reject) {
      var user, hashPasswordFromBcrypt;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            if (!data._id) {
              resolve({
                errCode: 2,
                message: 'Missing required parameters!'
              });
            }
            _context11.next = 4;
            return _User["default"].findOne({
              _id: data._id
            });
          case 4:
            user = _context11.sent;
            _context11.next = 7;
            return hashUserPassword(data.password);
          case 7:
            hashPasswordFromBcrypt = _context11.sent;
            if (!user) {
              _context11.next = 15;
              break;
            }
            user.password = hashPasswordFromBcrypt;
            _context11.next = 12;
            return _User["default"].updateOne({
              _id: data._id
            }, user);
          case 12:
            resolve({
              errCode: 0,
              message: "Ok"
            });
            _context11.next = 16;
            break;
          case 15:
            resolve({
              errCode: 1,
              message: "The User not found!"
            });
          case 16:
            _context11.next = 21;
            break;
          case 18:
            _context11.prev = 18;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 21:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 18]]);
    }));
    return function (_x18, _x19) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var changeUserFacultyService = function changeUserFacultyService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(resolve, reject) {
      var user;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            if (!data._id) {
              resolve({
                errCode: 2,
                message: 'Missing required parameters!'
              });
            }
            _context12.next = 4;
            return _User["default"].findOne({
              _id: data._id
            });
          case 4:
            user = _context12.sent;
            if (!user) {
              _context12.next = 13;
              break;
            }
            user.faculty = data.faculty;
            user.studentId = data.studentId;
            _context12.next = 10;
            return _User["default"].updateOne({
              _id: data._id
            }, user);
          case 10:
            resolve({
              errCode: 0,
              message: "Ok"
            });
            _context12.next = 14;
            break;
          case 13:
            resolve({
              errCode: 1,
              message: "The User not found!"
            });
          case 14:
            _context12.next = 19;
            break;
          case 16:
            _context12.prev = 16;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 19:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 16]]);
    }));
    return function (_x20, _x21) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var deleteUserService = function deleteUserService(_id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve, reject) {
      var user;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            if (!_id) {
              resolve({
                errCode: 2,
                message: 'Missing required parameters!'
              });
            }
            _context13.next = 4;
            return _User["default"].findById(_id);
          case 4:
            user = _context13.sent;
            if (!user) {
              _context13.next = 14;
              break;
            }
            if (_lodash["default"].isEmpty(user.public_id)) {
              _context13.next = 9;
              break;
            }
            _context13.next = 9;
            return (0, _cloudinaryUtils.deleteImageByPublicId)(user.public_id);
          case 9:
            _context13.next = 11;
            return _User["default"].deleteOne({
              _id: _id
            });
          case 11:
            // let allUsers = getAllUser();  
            resolve({
              errCode: 0,
              message: "OK"
            });
            _context13.next = 15;
            break;
          case 14:
            resolve({
              errCode: 1,
              message: "The user not found!"
            }); // return
          case 15:
            _context13.next = 21;
            break;
          case 17:
            _context13.prev = 17;
            _context13.t0 = _context13["catch"](0);
            console.log("check error", _context13.t0);
            reject(_context13.t0);
          case 21:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 17]]);
    }));
    return function (_x22, _x23) {
      return _ref13.apply(this, arguments);
    };
  }());
};
var getAllRoleService = function getAllRoleService() {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(resolve, reject) {
      var roles;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _Role["default"].find({}).select({
              createdAt: 0,
              updatedAt: 0,
              description: 0
            });
          case 3:
            roles = _context14.sent;
            resolve({
              errCode: 0,
              message: "OK",
              data: roles
            });
            _context14.next = 10;
            break;
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            reject(_context14.t0);
          case 10:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 7]]);
    }));
    return function (_x24, _x25) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var fetchDepartmentUserService = function fetchDepartmentUserService(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve, reject) {
      var departmentRole, users, i, conversation, conversationId, lastMessage, newUser;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _Role["default"].findOne({
              name: 'Department'
            });
          case 3:
            departmentRole = _context15.sent;
            if (!departmentRole) {
              _context15.next = 26;
              break;
            }
            _context15.next = 7;
            return _User["default"].find({
              roleID: departmentRole._id
            }).select({
              password: 0,
              public_id: 0,
              createdAt: 0,
              updatedAt: 0,
              studentId: 0,
              faculty: 0,
              __v: 0
            });
          case 7:
            users = _context15.sent;
            i = 0;
          case 9:
            if (!(i < users.length)) {
              _context15.next = 23;
              break;
            }
            _context15.next = 12;
            return _Conversation["default"].findOne({
              participants: {
                $all: [userId, users[i]._id]
              }
            }).select({
              __v: false,
              _id: false,
              isNewConversation: false,
              createdAt: false,
              updatedAt: false
            });
          case 12:
            conversation = _context15.sent;
            if (!conversation) {
              _context15.next = 20;
              break;
            }
            conversationId = conversation.conversationId;
            _context15.next = 17;
            return _Message["default"].findOne({
              conversation: conversationId
            }).sort({
              createdAt: -1
            }).select({
              __v: 0,
              updatedAt: 0,
              __t: 0,
              _id: 0,
              createdAt: 0
            });
          case 17:
            lastMessage = _context15.sent;
            newUser = _objectSpread(_objectSpread({}, users[i]._doc), {}, {
              conversationId: conversationId,
              lastMessage: lastMessage
            }); // users.pop(users[i]);
            users.splice(i, 1, newUser);
          case 20:
            i++;
            _context15.next = 9;
            break;
          case 23:
            // users.reverse();
            // console.log("check after produce users", users);
            // return;
            resolve({
              errCode: 0,
              message: "OK",
              data: users
            });
            _context15.next = 27;
            break;
          case 26:
            resolve({
              errCode: 1,
              message: "Department role not found!"
            });
          case 27:
            _context15.next = 33;
            break;
          case 29:
            _context15.prev = 29;
            _context15.t0 = _context15["catch"](0);
            console.log("check e", _context15.t0);
            reject(_context15.t0);
          case 33:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 29]]);
    }));
    return function (_x26, _x27) {
      return _ref15.apply(this, arguments);
    };
  }());
};
module.exports = {
  handleLoginGoogleService: handleLoginGoogleService,
  handleLoginGoogleDepartmentService: handleLoginGoogleDepartmentService,
  handleLoginService: handleLoginService,
  hashUserPassword: hashUserPassword,
  createUserService: createUserService,
  fetchAllUser: fetchAllUser,
  getUserById: getUserById,
  fetchAccountService: fetchAccountService,
  updateUserService: updateUserService,
  changeUserPasswordService: changeUserPasswordService,
  changeUserFacultyService: changeUserFacultyService,
  deleteUserService: deleteUserService,
  getAllRoleService: getAllRoleService,
  fetchDepartmentUserService: fetchDepartmentUserService
};