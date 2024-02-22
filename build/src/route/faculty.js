"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _facultyController = _interopRequireDefault(require("../controllers/facultyController"));
var router = _express["default"].Router();
router.post('/faculty', _facultyController["default"].createFaculty);
router.get('/faculty', _facultyController["default"].fetchAllFaculty);
router.put('/faculty', _facultyController["default"].updateFaculty);
router["delete"]('/faculty/:id', _facultyController["default"].deleteFaculty);
var _default = exports["default"] = router;