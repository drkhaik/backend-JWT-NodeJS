"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

// User.find({}).populate('role', 'name');

var Role = mongoose.model('Role', roleSchema);
module.exports = Role;