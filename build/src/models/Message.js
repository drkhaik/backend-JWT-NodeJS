"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  conversation: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
  },
  public_id: {
    type: String
  },
  fileName: {
    type: String
  },
  fileType: {
    type: String
  },
  fileSize: {
    type: Number
  }
}, {
  timestamps: true
});
var Message = mongoose.model('Message', messageSchema);
module.exports = Message;