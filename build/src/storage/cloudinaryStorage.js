"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _multerStorageCloudinary = require("multer-storage-cloudinary");
var _cloudinary = _interopRequireDefault(require("../config/cloudinary"));
var imageStorage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary["default"],
  params: (0, _defineProperty2["default"])((0, _defineProperty2["default"])({
    folder: 'images-uef',
    format: 'png'
  }, "format", 'jpg'), "format", 'jpeg')
});

// const messageFileStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: (req, file) => {
//         return {
//             folder: 'message-file-uef',
//             resource_type: 'auto',
//             public_id: file.originalname
//         }
//     },
// });

module.exports = {
  imageStorage: imageStorage
  // messageFileStorage: messageFileStorage
};