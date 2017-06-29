(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", UserService);

  function UserService($http) {
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

    // Assumes that username is already unique
    function createUser(user) {
      var id = generateId();
      var userToAdd = {_id : id, username : user.username, password : user.password, firstName : user.firstName,
        lastName : user.lastName};
      users.push(userToAdd);
    }

    function generateId() {
      function getMaxId(maxId, user) {
        console.log("Entered getMaxId");
        var currId = parseInt(user._id);
        if (maxId > currId) {
          console.log("We should enter here if current unique id greater than the current id that we are comparing.")
          console.log(maxId);
          return maxId;
        }
        else {
          console.log("The current unique id has changed and increased by one from the current id.")
          console.log(currId + 1);
          return currId + 1;
        }
      }
      var uniqueId = users.reduce(getMaxId, 0).toString();
      console.log("We generated a unique id. It is: " + uniqueId);
      return uniqueId;
    }

    function findUserById(userId) {
      // invoke the URL
      var url = "/api/user/" + userId;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function findUserByUsername(username) {
      var key;
      for (key in users) {
        var userActual = users[key];
        if(userActual.username === username) {
          return userActual;
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      var url = "/api/user?username=" + username + "&password=" + password;
      // .get returns not the business object but an HTTP response object
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function updateUser(userId, user) {
      deleteUser(userId);
      users.push(user);
      console.log(users);
    }

    function deleteUser(userId) {
      users = users.filter(function(el) { return el._id !== userId});
      console.log(users);
    }

  }

  // helper functions
})();

