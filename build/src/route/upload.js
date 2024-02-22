"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _fs = _interopRequireDefault(require("fs"));
var _multer = _interopRequireDefault(require("multer"));
var _cloudinaryStorage = require("../storage/cloudinaryStorage");
var _cloudinaryUtils = require("../utils/cloudinaryUtils");
var _mimeTypes = _interopRequireDefault(require("mime-types"));
var _cloudinary = require("cloudinary");
var router = _express["default"].Router();
var uploadImage = (0, _multer["default"])({
  storage: _cloudinaryStorage.imageStorage
});
var uploadMessageFile = (0, _multer["default"])({
  dest: 'public/',
  fileFilter: function fileFilter(req, file, cb) {
    var mimeType = _mimeTypes["default"].lookup(file.originalname);
    if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/jpg' || mimeType === 'application/pdf' || mimeType === 'application/zip' || mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, PDF, Word, and Excel files are allowed'));
    }
  }
});
router.post('/upload/image', uploadImage.single('file'), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var public_id, file, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (!req.body.public_id) {
            _context.next = 5;
            break;
          }
          public_id = req.body.public_id;
          _context.next = 5;
          return (0, _cloudinaryUtils.deleteImageByPublicId)(public_id);
        case 5:
          if (req.file && req.file.path) {
            file = req.file;
            data = {
              url: file.path,
              public_id: file.filename
            };
            res.status(200).json({
              errCode: 0,
              data: data
            });
          } else {
            res.status(400).send('No file uploaded');
          }
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(_context.t0.status || 500).send(_context.t0.message);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/upload/file', uploadMessageFile.single('file'), /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (req.file) {
            _context2.next = 3;
            break;
          }
          throw new Error('No file uploaded');
        case 3:
          _context2.next = 5;
          return _cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: 'message-file-uef',
            // mutate the public_id so u can not upload another file with the
            // same name, because it will have the same url.
            public_id: req.file.originalname
          });
        case 5:
          result = _context2.sent;
          _fs["default"].unlinkSync(req.file.path);
          data = {
            url: result.secure_url,
            public_id: result.public_id
          };
          res.status(200).json({
            errCode: 0,
            data: data
          });
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send('Upload to Cloudinary failed');
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// router.post('/upload/file', uploadMessageFile.single('file'), async (req, res) => {
//     console.log("cehck file", req.file);
//     // console.log("cehck public_id", req.body.public_id);
//     // return;
//     try {
//         if (req.file && req.file.path) {
//             const file = req.file;
//             let data = {
//                 url: file.path,
//                 public_id: file.filename,
//                 fileName: file.originalname
//             }
//             res.status(200).json({
//                 errCode: 0,
//                 data: data
//             });
//         } else {
//             res.status(400).send('No file uploaded');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(error.status || 500).send(error.message);
//     }
// });
var _default = exports["default"] = router;