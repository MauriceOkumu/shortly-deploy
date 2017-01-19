var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.find({}).exec(function(err, links) {
    res.status(200).send(links);
  });
  // Links.reset().fetch().then(function(links) {
  //   res.status(200).send(links.models);
  // });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  Link.findOne({ url: uri }).exec(function(err, link) {
    // if (err) {
    //   console.log('ERROR: existing link error');
    // } 
    if (link) {
      // console.log('LINK !!!! exists', link);
      res.status(200).send(link);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin
        });
        newLink.save(function(err, newLink) {
          // Links.add(newLink);
          if (err) {
            console.log('ERROR: creating link error');
            res.send(err);
          } 
          // console.log('err', err, 'NEW LINK FOR TEST', result);
          res.status(200).send(newLink);
        });
      });
    }
  });


  // new Link({ url: uri }).fetch().then(function(found) {
    // if (found) {
    //   res.status(200).send(found.attributes);
    // } else {
    //   util.getUrlTitle(uri, function(err, title) {
    //     if (err) {
    //       console.log('Error reading URL heading: ', err);
    //       return res.sendStatus(404);
    //     }
    //     var newLink = new Link({
    //       url: uri,
    //       title: title,
    //       baseUrl: req.headers.origin
    //     });
    //     newLink.save().then(function(newLink) {
    //       Links.add(newLink);
    //       res.status(200).send(newLink);
    //     });
    //   });
    // }
  // });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
  //added the err parameter
    .exec(function(err, user) {
      if (!user) {
        res.redirect('/login');
      } else {
        //added the err parameter in the callback
        User.comparePassword(username, password, function(err, match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
            // Users.add(newUser);
            //added error handling
          if (err) {
            res.send(err);
          }
          util.createSession(req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  //added the error handler
  Link.findOne({ code: req.params[0] }).exec(function(err, link) {
    if (!link) {
      res.redirect('/');
    } else {
      //it was link.set changed it to link.save
      link.save(function(err, link) {
        return res.redirect(link.url);
      });
    }
  });
};