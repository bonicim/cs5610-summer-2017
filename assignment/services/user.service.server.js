var app = require('../../express');

// temporary database
var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
  {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
  {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
  {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }];

// RESTful URL's of this resource browser is expecting data not HTML

// POST
app.post('/api/user', createUser);

// GET
app.get('/api/user?username=username', findUserByUsername);
app.get('/api/user?username=username&password=password', findUserByCredentials);
app.get('/api/user/:userId', findUserById);

// PUT
app.put('/api/user/:userId', updateUser);

// DELETE
app.delete('/api/user/:userId', deleteUser)


// TODO: implement business logic
function createUser() {

}

function findUserByUsername(req, res) {
}

function findUserByCredentials(req, res) {
}

function findUserById(req, res) {
  var key;
  var userId = req.params['userId'];
  for (key in users) {
    var userActual = users[key];
    if(parseInt(userActual._id) === parseInt(userId)) {
      res.send(userActual);
      return;
    }
  }
  res.sendStatus(404);
}

function updateUser() {

}

function deleteUser() {

}

