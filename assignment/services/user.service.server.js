var app = require('../../express');

// temporary database
var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
  {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
  {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
  {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }];

// Server listeners on specific URL's

// POST
app.post('/api/user', createUser);

// GET
app.get('/api/user', findUserByCredentials);
app.get('/api/user/:userId', findUserById);

// PUT
app.put('/api/user/:userId', updateUser);

// DELETE
app.delete('/api/user/:userId', deleteUser)

// Implementations of event handlers
function createUser(req, res) {
  var user = req.body;
  var id = generateId();
  var userToAdd = {
    '_id' : id,
    username : user.username,
    password : user.password,
    firstName : user.firstName,
    lastName : user.lastName};
  users.push(userToAdd);
  res.json(userToAdd); // we know for sure that userToAdd is a JSON
}

function generateId() {
  function getMaxId(maxId, user) {
    var currId = parseInt(user._id);
    //maxId > currId ? maxId : currId + 1;
    if (maxId > currId) {
      return maxId;
    }
    else {
      return currId + 1;
    }
  }
  return users.reduce(getMaxId, 0).toString();
}

function findUserByCredentials(req, res) {
  var username = req.query['username'];
  var password = req.query.password;

  if (username && password) {
    for (key in users) {
      var userActual = users[key];
      if ((userActual.username === username) && (userActual.password === password)) {
        res.status(200).send(userActual);
        return;
      }
    }
    res.sendStatus(404);
    return;
  }
  else if (username) {
    for (key in users) {
      var userActual = users[key];
      if (userActual.username === username) {
        res.status(200).send(userActual);
        return;
      }
    }
    res.sendStatus(404);
    return;
  }

}

function findUserById(req, res) {
  var userId = req.params['userId'];
  for (key in users) {
    var userActual = users[key];
    if(parseInt(userActual._id) === parseInt(userId)) {
      res.send(userActual);
      return;
    }
  }
  res.sendStatus(404);
  return;
}

function updateUser(req, res) {
  var user = req.body;
  for (key in users) {
    var userActual = users[key];
    if(parseInt(userActual._id) === parseInt(req.params.userId)) {
      users[key] = user;
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
  return;
}

function deleteUser(req, res) {
  for (key in users) {
    var userActual = users[key];
    if(parseInt(userActual._id) === parseInt(req.params.userId)) {
      users.splice(key,1);
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
  return;

}

