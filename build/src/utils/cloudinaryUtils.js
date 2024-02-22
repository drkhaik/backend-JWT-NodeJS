"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = _interopRequireDefault(require("../config/cloudinary"));
function deleteImageByPublicId(_x) {
  return _deleteImageByPublicId.apply(this, arguments);
}
function _deleteImageByPublicId() {
  _deleteImageByPublicId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(public_id) {
    var _yield$cloudinary$upl, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _cloudinary["default"].uploader.destroy(public_id);
        case 3:
          _yield$cloudinary$upl = _context.sent;
          result = _yield$cloudinary$upl.result;
          if (result === "not found") {
            console.log("No public_id provided");
          }
          if (result !== "ok") {
            console.log("Failed to delete image");
          }
          return _context.abrupt("return", "Image deleted successfully");
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _deleteImageByPublicId.apply(this, arguments);
}
module.exports = {
  deleteImageByPublicId: deleteImageByPublicId
};