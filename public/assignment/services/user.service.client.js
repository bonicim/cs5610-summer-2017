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

    /**
     *  Assumes that username is already unique
     * @param user
     * @returns User
     */
    function createUser(user) {
      var url = "/api/user";
      // .post takes two args: url, object to be posted
      return $http.post(url, user)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Returns a User given a user ID
     * @param userId
     * @returns User
     */
    function findUserById(userId) {
      var url = "/api/user/" + userId;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Returns a User given a username
     * @param username
     * @returns User
     */
    function findUserByUsername(username) {
      var url = "/api/user?username=" + username;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    // TODO: change to POST to hide username and password in URL
    /**
     * Returns a User given a username and password
     * @param username
     * @param password
     * @returns User
     */
    function findUserByCredentials(username, password) {
      var url = "/api/user?username=" + username + "&password=" + password;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Updates the user given the user ID and the updated User object
     * @param userId
     * @param user
     * @returns The newly update User
     */
    function updateUser(userId, user) {
      var url = "/api/user/" + userId;
      return $http.put(url, user)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Removes the user from the database given the user ID
     * @param userId
     * @returns
     */
    function deleteUser(userId) {
      var url = "/api/user/" + userId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        });
    }

  }

})();

