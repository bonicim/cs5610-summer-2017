var app = require('../../express');
var yuserModel = require('../../shared/model/models/user.model.server');
var passport = require('../../shared/strategy/passport.strategy');
var bcrypt = require('bcrypt-nodejs');

// Server listeners on specific URL's
app.post('/yapi/register', register);

app.get('/yapi/user', findUserById); // /yapi/user?userId=<actualusername>
app.get('/yapi/user', findUserByUsername); // /yapi/user?username=<actualusername>
app.get('/yapi/user', findUserByCredentials); // /yapi/user?username=<actualusername>&password=<password>
app.get('/yapi/eligible', findUsersEligible);

app.put('/yapi/user/:userId', updateUser);
app.delete('/yapi/user/:userId', deleteUser);

app.get('/yapi/checkLoggedIn', checkLoggedIn); // does not use HTTPS; must pay for HTTPS, allows queries to be encrypted
app.post('/yapi/login', passport.authenticate('local'), login); //passport will authenticate login via 'local' strategy
app.post('/yapi/logout', logout);

// outgoing to google, passport redirect to google
app.get('/yauth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// endpoint created for google callback, passport handles callback
app.get('/yauth/google/callback', passport.authenticate('google', {
    successRedirect: '/public/project/index.html#/profile',
    failureRedirect: '/public/project/index.html#/login'
  }));


function register(req, res) {
  var user = req.body;
  // encrypt the password
  user.password = bcrypt.hashSync(user.password);

  yuserModel
    .createUser(user)
    .then(function (user) {
      if(user) {
        req.login(user, function(err) {
          if(err) {
            res.sendStatus(400);
          } else {
            console.log("inside login: Our new user is:", user);
            res.json(user);
          }
        });
      }
    })
  .catch(function (err) {
    res.status(400).send(err);
  });
}

function findUserById(req, res) {
  var userId = req.query['userId'];
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
  var username = req.query.username;
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
            res.sendStatus(404);
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
  console.log("Inside findUserByUsername");
  var username = req.query.username;
  console.log("The username is: ", username);
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

function findUsersEligible(req, res) {
  yuserModel
    .findUsersEligible()
    .then(function (users) {
      if (users) {
        res.json(users);
      }
      else {
        res.sendStatus(400);
      }
    })
    .catch(function (err) {
      console.log("failure", err);
    })
}

// this becomes more complex when adding more widgets
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
    .then(function (result) {
        if (result) {
          console.log("success in delete user: ", result)
          res.json(result);
        } else {
          res.sendStatus(400);
        }
      }
    )
    .catch(function (err) {
      console.log("Bug on deleting user and widgets: ", err);
      res.json(err);
    });
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
