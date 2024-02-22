"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var facultySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});
var Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;