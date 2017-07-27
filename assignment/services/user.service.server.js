var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy)); // passport will authenticate based on strategy defined by 'localStrategy' function
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


// Server listeners on specific URL's
app.post('/api/user', createUser);

// TODO: refactor to POST to hide params
// does not use HTTPS; must pay for HTTPS, allows queries to be encrypted
app.post('/api/login', passport.authenticate('local'), login); //passport will authenticate login via 'local' strategy
app.get('/api/user', findUserByCredentials);

app.get('/api/user', findUserByUsername);
app.get('/api/user/:userId', findUserById);

app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

app.get('/api/checkLoggedIn', checkLoggedIn);

// Implementations of event handlers
function checkLoggedIn(req, res) {
    // syntactic sugar for doing authentication; method added to req when adding passport library
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
}

function login(req,res) {
  res.json(req.user);
}

// Local strategy is to simply check username and password
// uses database's function to check for user name and password, which is essentially authentication
function localStrategy(username, password, done) {
  userModel
    .findUserByCredentials(username, password)
    .then(function (user) {
      if (user) {
        done(null, user); //goes to login()
      }
      else {
        done(null, false); //abort the http request; does not hit login()
      }
    })
    .catch(function (err) {
      done(err, false);
    })
}


// these functions are called after authentication succeeds
// cookie is used to keep data in client browser
// cookies is encrypted on the client side
// create hooks to store and retrieve things in cookie
// decides what to store
function serializeUser(user, done) {
  done(null,user);
}

// decides what to unwrap
// intercept each request and authenticate
function deserializeUser(user, done) {
  userModel
    .findUserById(user._id)
    .then(
      function (user) {
        done(null, user);
      }
    )
    .catch(function (err) {
      done(err, null);
    })
}





















function createUser(req, res) {
  var user = req.body;
  userModel
    .createUser(user)
    .then(function(user) {
        if (user) {
          res.json(user);
        }
        else {
          res.sendStatus(400).send("Bad input. User not created.");
        }
      }
    )
    .catch(function (err, res) {
      console.log("Could not call database", err)
      res.send(err);
    });
}

function findUserById(req, res) {
  var userId = req.params['userId'];
  userModel
    .findUserById(userId)
    .then(
      function(err, user) {
        if (err) {
          res.send(err);
        }
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("No user found.");
        }
      }
    );
}

function findUserByCredentials(req, res) {
  var username = req.query['username'];
  var password = req.query.password;
  userModel
    .findUserByCredentials(username, password)
    .then(
      function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("No user found.");
        }
      }
    ).catch(function (err) {
      console.log("Failed to call service", err);
      res.send(err);
  });
}

function findUserByUsername(req, res) {
  var username = req.params[username];
  userModel
    .findUserByUsername(username)
    .then(
      function(err, user) {
        if (err) {
          res.send(err);
        }
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("No user found.");
        }
      }
    );
}

function updateUser(req, res) {
  var user = req.body;
  var userId = req.params.userId;
  userModel
    .updateUser(userId, user)
    .then(
      function(err, user) {
        if (err) {
          res.send(err);
        }
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("No user found.");
        }
      }
    );
}

function deleteUser(req, res) {
  var userId = req.params.userId;
  userModel
    .deleteUser(userId)
    .then(
      function(err, user) {
        if (err) {
          res.send(err);
        }
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("User could not be deleted.");
        }
      }
    );
}

