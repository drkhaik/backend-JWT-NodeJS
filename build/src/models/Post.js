"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;