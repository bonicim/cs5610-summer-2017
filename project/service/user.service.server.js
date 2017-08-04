var app = require('../../express');
var yuserModel = require('../../shared/model/models/user.model.server');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy)); // passport will authenticate based on strategy defined by 'localStrategy' function
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
  clientID     : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

// Server listeners on specific URL's

app.post('/yapi/register', register);
// does not use HTTPS; must pay for HTTPS, allows queries to be encrypted
app.post('/yapi/login', passport.authenticate('local'), login); //passport will authenticate login via 'local' strategy
app.post('/yapi/logout', logout);
app.get('/yapi/checkLoggedIn', checkLoggedIn);
app.post('/yapi/user', createUser); //powerful api, limit to admin
// outgoing to google, passport redirect to google
app.get('/yauth/google',
  passport.authenticate('google',
    { scope : ['profile', 'email'] }));

// endpoint created for google callback, passport handles callback
app.get('/yauth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/public/project/index.html#/profile',
    failureRedirect: '/public/project/index.html#/login'
  }));

app.get('/yapi/user', findUserByCredentials);
app.get('/yapi/user', findUserByUsername);
app.get('/yapi/user/:userId', findUserById);

app.put('/yapi/user/:userId', updateUser);
app.delete('/yapi/user/:userId', deleteUser);


function register(req, res) {
  var user = req.body;
  user.password = bcrypt.hashSync(user.password);

  yuserModel
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

// passport.authenticates will handle the request before login() is called
// if passport.authenticate passes successfully, login is invoked and the user is returned in req.user
function login(req, res) {
  res.json(req.user);
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

function googleStrategy(token, refreshToken, profile, done) {
  yuserModel
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
          return yuserModel.createUser(newGoogleUser);
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
// Local strategy is to simply check username and password
// uses database's function to check for user name and password, which is essentially authentication
function localStrategy(username, password, done) {
  console.log("inside localStrate: ", username, password);
  // get the password from the db asscoiated with the username
  // then compare the decrypted password with the plaintext password
  yuserModel
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
  yuserModel
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
  yuserModel
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
  yuserModel
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
  yuserModel
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
  yuserModel
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
  yuserModel
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
  yuserModel
    .deleteUser(userId)
    .then(
      function (err, user) {
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

