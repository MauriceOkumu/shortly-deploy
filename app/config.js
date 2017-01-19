var path = require('path');
var mongoose = require('mongoose');
// var mongodb = require('mongodb');
mongoose.connect('mongodb://localhost/shortlydb');
// var db = mongoose.createConnection('localhost', 'shortlydb');
// db.on('error', function() {
//   console.log('ERROR: Cannot connect to db');
// });
// db.once('open', function(arg) {
//   console.log('Hooray! You are connected to db');
// });

var Schema = mongoose.Schema;

// create a schema
var Users = new Schema({
  // id: objectId(),
  username: { type: String },
  password: { type: String }
});

var Links = new Schema({
  // id: objectId(),
  url: { type: String },
  baseUrl: { type: String },
  code: { type: String },
  title: { type: String },
  visits: { type: Number }
});

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports.users = Users;

module.exports.links = Links;
