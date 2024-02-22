"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Role = _interopRequireDefault(require("../models/Role"));
var getRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var role;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          role = null; // role = await db.Role.findOne({
          //     where: { id: user.roleID },
          //     attributes: ["id", "name", "description"]
          //     // include: [{ model: db.Role }]
          // })
          _context.next = 3;
          return _Role["default"].findById(user.roleID).select({
            _id: 0,
            description: 0
          });
        case 3:
          role = _context.sent;
          return _context.abrupt("return", role);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getRole(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  getRole: getRole
};