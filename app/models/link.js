var db = require('../config');
var crypto = require('crypto');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema({
  url: { type: String, required: true, unique: true },
  baseUrl: { type: String },
  code: { type: String },
  title: { type: String },
  visits: { type: Number }
});
//separated the initialize from the schema
var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;
