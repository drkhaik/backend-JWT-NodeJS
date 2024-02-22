"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _route = _interopRequireDefault(require("./route"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _socketService = _interopRequireDefault(require("./services/socketService"));
require("./middleware/passportGoogleSSO");
var _passport = _interopRequireDefault(require("passport"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cookieSession = _interopRequireDefault(require("cookie-session"));
require('@babel/register');
require('dotenv').config();
// node src/server.js
// nodemon --exec babel-node src/server.js
// "build": "webpack --mode development --watch",

var app = (0, _express["default"])();
var port = process.env.PORT || 6969;

// config Cors
(0, _cors["default"])(app);

//config view engine
(0, _viewEngine["default"])(app);

// config cookie parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));

// config cookie parser
app.use((0, _cookieParser["default"])());
app.use((0, _helmet["default"])());
app.use((0, _cookieSession["default"])({
  maxAge: 60 * 60 * 1000,
  keys: [process.env.JWT_SECRET]
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// // test JWT
// createTokenJWT();
// let decoded = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHJraGFpayIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE2OTkwMjk5NTZ9.C4oRk1YX-HR6YA0pCBWFU3AkzeU3mRVoypSQ7rCcxn4");
// console.log(decoded);

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _connectDB["default"])();
        case 3:
          (0, _route["default"])(app);
          app.use(function (req, res) {
            return res.send('404 not found!');
          });
          server = app.listen(port, function () {
            console.log("Backend Node Js is running on the port: " + port);
          });
          (0, _socketService["default"])(server);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error starting server:', _context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();
startServer();