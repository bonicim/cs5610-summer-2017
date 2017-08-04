var app = require('../../express');
var userModel = require('../../shared/model/models/user.model.server');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../../shared/strategy/passport.strategy'); // strategy defined here

// Server listeners on specific URL's
app.post('/api/register', register);
app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.get('/api/checkLoggedIn', checkLoggedIn);
// does not use HTTPS; must pay for HTTPS, allows queries to be encrypted
app.post('/api/login', passport.authenticate('local'), login); //passport will authenticate login via 'local' strategy
app.post('/api/logout', logout);
// outgoing to google, passport redirect to google
app.get('/auth/google', passport.authenticate('google',
    { scope : ['profile', 'email'] }));
// endpoint created for google callback, passport handles callback
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/public/assignment/index.html#/profile',
    failureRedirect: '/public/assignment/index.html#/login'
  }));

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
          res.sendStatus(400);
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

///////////////////////AUTH/////////////////////////////////////////
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

function logout(req, res) {
  req.logout(); // removes user from session; clears session and invalidate cookie
  // this is syntactic sugar that invalidates the current user
  res.sendStatus(200);
}
