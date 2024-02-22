"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  conversationId: {
    type: String,
    required: true
  },
  isNewConversation: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
var Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;