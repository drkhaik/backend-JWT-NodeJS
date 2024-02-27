"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
require('dotenv').config();
var nonSecurePaths = ['/', '/logout', '/login', '/auth/google', '/auth/google/callback', '/auth/student', '/auth/department'];
var createTokenJWT = function createTokenJWT(payload) {
  var key = process.env.JWT_SECRET;
  var expiresIn = {
    expiresIn: process.env.JWT_EXPIRES_IN
  };
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key, expiresIn);
  } catch (err) {
    console.log(err);
  }
  // console.log(token);
  return token;
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
  // jwt.verify(token, key, function (err, decoded) {
  //     if (err) {
  //         console.log(err);
  //         return data;
  //     }
  //     console.log(decoded);
  //     return decoded;
  // })
};
var checkTokenJWT = function checkTokenJWT(req, res, next) {
  // console.log("check path", req.path);
  if (nonSecurePaths.includes(req.path)) return next();
  var cookies = req.cookies;
  if (cookies && cookies.jwt) {
    var token = cookies.jwt;
    var decoded = verifyToken(token);
    if (decoded) {
      // console.log(decoded);
      req.tokenDecoded = decoded;
      req.token = token;
      return next();
    }
  }
  return res.status(401).json({
    errCode: -1,
    message: "Unauthorized!"
  });
};
var checkAdminPermission = function checkAdminPermission(req, res, next) {
  // console.log("check req.tokenDecoded", req.tokenDecoded);
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.tokenDecoded) {
    // console.log("check user", req.tokenDecoded.user);
    var role = req.tokenDecoded.user.role;
    if (role && role === 'Admin') {
      return next();
    }
  }
  return res.status(403).json({
    errCode: -1,
    message: "Permission denied!"
  });
};
module.exports = {
  createTokenJWT: createTokenJWT,
  verifyToken: verifyToken,
  checkTokenJWT: checkTokenJWT,
  checkAdminPermission: checkAdminPermission
};