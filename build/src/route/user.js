"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _JWTAction = require("../middleware/JWTAction");
var _userController = _interopRequireDefault(require("../controllers/userController"));
var router = _express["default"].Router();
router.post('/login', _userController["default"].handleLogin);
router.get('/fetch-account', _userController["default"].fetchAccount);
router.post('/logout', _userController["default"].handleLogout);
router.get("/auth/google", _passport["default"].authenticate("google", {
  scope: ["profile", "email"],
  hd: 'uef.edu.vn',
  prompt: 'select_account'
}));
router.get("/auth/google/callback", _passport["default"].authenticate("google", {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: "".concat(process.env.URL_FRONTEND, "/login/error"),
  successRedirect: "".concat(process.env.URL_FRONTEND, "/login/success")
}), function (req, res) {
  console.log("User: ", req.user);
  res.send("Thank you for signing in!");
});
router.get('/auth/student', _userController["default"].handleGoogleLogin);
router.get('/auth/department', _userController["default"].handleGoogleLoginDepartment);
router.get('/users', _JWTAction.checkAdminPermission, _userController["default"].fetchAllUser);
router.get('/user/:id', _JWTAction.checkAdminPermission, _userController["default"].fetchUser);
router.post('/user', _userController["default"].createNewUser);
router.put('/user', _userController["default"].updateUser);
router.put('/user/change-password', _userController["default"].changeUserPassword);
router["delete"]('/user/:id', _JWTAction.checkAdminPermission, _userController["default"].deleteUser);
router.put('/user/change-faculty', _userController["default"].changeFaculty);
router.get('/role', _userController["default"].getAllRole);
router.get('/users/department/:id', _userController["default"].fetchDepartmentUser);
var _default = exports["default"] = router;