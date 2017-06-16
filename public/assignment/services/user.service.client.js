(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", UserService);

  function UserService() {
    // temporary database
    var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
      {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
      {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
      {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }];

    // api interface object
    var api = {
      "createUser" : createUser,
      "findUserById" : findUserById,
      "findUserByUsername" : findUserByUsername,
      "findUserByCredentials" : findUserByCredentials,
      "updateUser" : updateUser,
      "deleteUser" : deleteUser
    };

    return api;

    function createUser(user) {

    }

    function findUserById(userId) {
      var key;
      for (key in users) {
        var userActual = users[key];
        if(parseInt(userActual._id) === parseInt(userId)) {
          return userActual;
        }
      }
      return null;
    }

    function findUserByUsername(username) {

    }

    function findUserByCredentials(username, password) {

    }

    function updateUser(userId, user) {

    }

    function deleteUser(userId) {

    }

  }

})();

