"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var User = require('../models/User');
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "".concat(process.env.URL_BACKEND, "/api/v1/auth/google/callback"),
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, accessToken, refreshToken, profile, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(profile._json.hd !== 'uef.edu.vn')) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", done(null, false, 'Unauthorized domain'));
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return User.findOne({
            googleId: profile.id
          });
        case 5:
          user = _context.sent;
          if (user) {
            _context.next = 10;
            break;
          }
          user = new User({
            googleId: profile.id,
            name: "".concat(profile.name.familyName, " ").concat(profile.name.givenName),
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });
          _context.next = 10;
          return user.save();
        case 10:
          console.log("check user passport google SSO", user);
          return _context.abrupt("return", done(null, user));
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", done(_context.t0, null));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 14]]);
  }));
  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}()));

// passport.serializeUser((user, done) => {
//   done(null, user);
// })

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

passport.serializeUser(function (user, cb) {
  // console.log("Serializing user:", user);
  cb(null, user._id);
});
passport.deserializeUser( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_id, cb) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return User.findById(_id);
        case 3:
          user = _context2.sent;
          console.log("DeSerialized user", user);
          if (user) {
            cb(null, user);
          } else {
            cb(new Error('User not found'), null);
          }
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log("Error deserializing", _context2.t0);
          cb(_context2.t0, null);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());