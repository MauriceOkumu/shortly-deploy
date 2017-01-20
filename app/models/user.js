// var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

// create a schema
var userSchema = mongoose.Schema({
  // id: objectId(),
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
var User = mongoose.model('User', userSchema);

User.comparePassword = function(username, attemptedPassword, callback) {
  // get hashed password from db
  User.findOne({ username: username })
  .exec(function(err, user) {
    if (!user) {
      res.redirect('/login');
    } else {
      bcrypt.compare(attemptedPassword, user.password, function(err, isMatch) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, isMatch);
        }
      });
    }
  });
};
//Added the pre save method, refactored fro hash function
userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});



module.exports = User;
