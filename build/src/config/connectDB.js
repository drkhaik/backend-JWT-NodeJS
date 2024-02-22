"use strict";

require('dotenv').config();
var mongoose = require('mongoose');
var connectToDatabase = function connectToDatabase() {
  return new Promise(function (resolve, reject) {
    var databaseURI = process.env.DATABASE_URI;
    if (process.env.NODE_ENV === 'production') {
      // Use production database URI
      databaseURI = process.env.PRODUCTION_DATABASE_URI;
    }
    mongoose.connect(databaseURI);
    mongoose.connection.on("error", function (err) {
      console.log("Connect to DB fail", err.message);
      reject(err);
    });
    mongoose.connection.once("open", function () {
      console.log("Connect to DB success");
      resolve();
    });
  });
};
module.exports = connectToDatabase;