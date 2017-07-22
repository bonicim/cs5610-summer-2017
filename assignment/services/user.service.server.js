var app = require('../../express');
var userModel = require('../models/user/user.model.server');

// Server listeners on specific URL's
app.post('/api/user', createUser);
app.get('/api/user', findUserByCredentials);
app.get('/api/user', findUserByUsername);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser)

// Implementations of event handlers
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

