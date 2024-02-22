"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _socket = require("socket.io");
var _Message = _interopRequireDefault(require("../models/Message"));
require('dotenv').config();
module.exports = function (server) {
  var io = new _socket.Server(server, {
    cors: {
      origin: process.env.URL_FRONTEND,
      methods: ['GET', 'POST']
    }
  });
  io.on("connection", function (socket) {
    socket.on("join_room", function (roomId) {
      socket.join(roomId);
      // console.log(`User with ID, ${socket.id} joined room: ${roomId}`);
    });
    socket.on("send_message", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var room, author, body, type, newMessage, messageReceive;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              room = data.room, author = data.author, body = data.body, type = data.type;
              _context.prev = 1;
              newMessage = new _Message["default"]({
                conversation: room,
                body: body,
                type: type,
                author: author
              });
              messageReceive = {
                conversation: room,
                body: body,
                type: type,
                author: author
              };
              socket.to(room).emit("receive_message", messageReceive);
              _context.next = 7;
              return newMessage.save();
            case 7:
              _context.next = 14;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.error("Error handling conversation", _context.t0);
              socket.emit("message_error", "Failed to send message");
              throw _context.t0;
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 9]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    socket.on("send_file", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var room, author, body, type, fileUrl, public_id, fileName, fileType, fileSize, newMessage;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              room = data.room, author = data.author, body = data.body, type = data.type, fileUrl = data.fileUrl, public_id = data.public_id, fileName = data.fileName, fileType = data.fileType, fileSize = data.fileSize;
              _context2.prev = 1;
              newMessage = new _Message["default"]({
                conversation: room,
                body: body,
                author: author,
                type: type,
                fileUrl: fileUrl,
                public_id: public_id,
                fileName: fileName,
                fileType: fileType,
                fileSize: fileSize
              });
              socket.to(room).emit("receive_file", newMessage);
              _context2.next = 6;
              return newMessage.save();
            case 6:
              _context2.next = 13;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error("Error handling conversation", _context2.t0);
              socket.emit("message_error", "Failed to send message");
              throw _context2.t0;
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 8]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  return io;
};