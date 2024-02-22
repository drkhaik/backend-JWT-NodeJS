"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Conversation = _interopRequireDefault(require("../models/Conversation"));
var _Message = _interopRequireDefault(require("../models/Message"));
var _User = _interopRequireDefault(require("../models/User"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createConversationService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
              var senderId, recipientId, conversation;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    senderId = data.senderId, recipientId = data.recipientId;
                    _context.next = 4;
                    return _Conversation["default"].findOne({
                      participants: {
                        $all: [senderId, recipientId]
                      }
                    });
                  case 4:
                    conversation = _context.sent;
                    if (!conversation) {
                      conversation = new _Conversation["default"]({
                        participants: [senderId, recipientId],
                        conversationId: "".concat(senderId, "-").concat(recipientId)
                      });
                    } else {
                      conversation.isNew = false;
                    }
                    _context.next = 8;
                    return conversation.save();
                  case 8:
                    resolve({
                      errCode: 0,
                      message: "OK",
                      data: conversation.conversationId
                    });
                    _context.next = 14;
                    break;
                  case 11:
                    _context.prev = 11;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);
                  case 14:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 11]]);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createConversationService(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchConversationByUserIdService = function fetchConversationByUserIdService(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var conversations, users, i, item, user, lastMessage, newUser;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Conversation["default"].find({
              participants: {
                $in: [userId]
              }
            }).select({
              __v: false,
              _id: false,
              isNewConversation: false,
              createdAt: false
            }).sort({
              updatedAt: -1
            });
          case 3:
            conversations = _context3.sent;
            users = [];
            i = 0;
          case 6:
            if (!(i < conversations.length)) {
              _context3.next = 19;
              break;
            }
            item = conversations[i].participants.filter(function (element) {
              return element.toHexString() !== userId;
            });
            _context3.next = 10;
            return _User["default"].find({
              _id: item[0]
            }, {
              _id: true,
              name: true,
              email: true,
              image: true
            });
          case 10:
            user = _context3.sent;
            _context3.next = 13;
            return _Message["default"].findOne({
              conversation: conversations[i].conversationId
            }).sort({
              createdAt: -1
            }).select({
              __v: 0,
              updatedAt: 0,
              __t: 0,
              _id: 0,
              createdAt: 0
            });
          case 13:
            lastMessage = _context3.sent;
            // console.log("check lastMessageId", lastMessage);
            newUser = _objectSpread(_objectSpread({}, user[0]._doc), {}, {
              conversationId: conversations[i].conversationId,
              lastMessage: lastMessage
            });
            users.push(newUser);
          case 16:
            i++;
            _context3.next = 6;
            break;
          case 19:
            // console.log("check users", users);
            // const users = await User.find({
            //     _id: { $in: arrRecipientId, },
            // }, { _id: true, name: true, email: true, image: true });
            resolve({
              errCode: 0,
              message: "OK",
              data: users
            });
            _context3.next = 25;
            break;
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 22]]);
    }));
    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
};
module.exports = {
  createConversationService: createConversationService,
  fetchConversationByUserIdService: fetchConversationByUserIdService
};