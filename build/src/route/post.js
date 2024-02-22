"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _postController = _interopRequireDefault(require("../controllers/postController"));
var router = _express["default"].Router();
router.post('/post', _postController["default"].createPost);
router.get('/post', _postController["default"].fetchAllPost);
router.put('/post', _postController["default"].updatePost);
router["delete"]('/post/:id', _postController["default"].deletePost);
router.post('/post/history', _postController["default"].fetchMorePost);
var _default = exports["default"] = router;