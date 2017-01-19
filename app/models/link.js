var db = require('../config');
var crypto = require('crypto');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Promise = require('bluebird');


var Link = mongoose.Schema;

// db.linkSchema = new Schema({
//   // id: objectId(),
//   url: { type: String, required: true, unique: true },
//   baseUrl: { type: String },
//   code: { type: String },
//   title: { type: String },
//   visits: { type: Number }
// });

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
