var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy)); // passport will authenticate based on strategy defined by 'localStrategy' function
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var bcrypt = require('bcrypt-nodejs');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
  clientID     : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

// Server listeners on specific URL's
app.post('/api/user', createUser);

// does not use HTTPS; must pay for HTTPS, allows queries to be encrypted
app.post('/api/login', passport.authenticate('local'), login); //passport will authenticate login via 'local' strategy
app.get('/api/user', findUserByCredentials);

app.get('/api/user', findUserByUsername);
app.get('/api/user/:userId', findUserById);

app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/logout', logout);
app.post('/api/register', register);

// outgoing to google, passport redirect to google
app.get('/auth/google',
  passport.authenticate('google',
    { scope : ['profile', 'email'] }));

// endpoint created for google callback, passport handles callback
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

// Implementations of event handlers
// TODO: validate on unique emailParts for username
function googleStrategy(token, refreshToken, profile, done) {
  userModel
    .findUserByGoogleId(profile.id)
    .then(
      function(user) {
        if(user) {
          return done(null, user); // create a new cookie with user info
        } else {
          var email = profile.emails[0].value;
          var emailParts = email.split("@");
          var newGoogleUser = {
            username:  emailParts[0],
            firstName: profile.name.givenName,
            lastName:  profile.name.familyName,
            email:     email,
            google: {
              id:    profile.id,
              token: token
            }
          };
          return userModel.createUser(newGoogleUser);
        }
      },
      function(err) {
        if (err) { return done(err); }
      }
    )
    .then(
      function(user){
        return done(null, user);
      },
      function(err){
        if (err) { return done(err); }
      }
    );
}



function register(req, res) {
  var user = req.body;
  // encrypt the password
  user.password = bcrypt.hashSync(user.password);

  userModel
    .createUser(user)
    .then(function (user) {
      // after creation of user in database, set login() to newly created user
      req.login(user, function (status) {
        res.json(user);
      })// notify Passport that currently new user, create a new cookie to headers, send to client
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function logout(req, res) {
  req.logout(); // removes user from session; clears session and invalidate cookie
  // this is syntactic sugar that invalidates the current user
  res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    // syntactic sugar for doing authentication; method added to req when adding passport library
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
}

// passport.authenticates will handle the request before login() is called
// if passport.authenticate passes successfully, login is invoked and the user is returned in req.user
function login(req, res) {
  res.json(req.user);
}

// Local strategy is to simply check username and password
// uses database's function to check for user name and password, which is essentially authentication
function localStrategy(username, password, done) {
  console.log("inside localStrate: ", username, password);
  // get the password from the db asscoiated with the username
  // then compare the decrypted password with the plaintext password
  userModel
    .findUserByUsername(username)
    .then(function (user) {
      console.log("We passed the findByUsername call: ", user);
      if (user) {
        if (user && bcrypt.compareSync(password, user.password)) {
          done(null, user); //goes to login()
        } else {
          done(null, false);
        }
      }
      else {
        done(null, false); //abort the http request; does not hit login()
      }

    })
    .catch(function (err) {
      console.log("Invalid password ", err)
    });
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
  console.log("cred is: ", username, password);
  userModel
    .findUserByCredentials(username, password)
    .then(
      function(user) {
        if (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            res.json(user);
          } else {
            res.sendStatus(404).send("Invalid password.");
          }
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

