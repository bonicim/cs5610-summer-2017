(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", UserService);

  function UserService($http) {
    // api interface object
    var api = {
      "createUser" : createUser,
      "findUserById" : findUserById,
      "findUserByUsername" : findUserByUsername,
      "findUserByCredentials" : findUserByCredentials,
      "login": login,
      "updateUser" : updateUser,
      "deleteUser" : deleteUser
    };
    return api;

    function login(username, password) {
      var url = "/api/login";
      var credentials = {
        username: username,
        password: password
      };
      return $http.post(url, credentials) // mapping must mirror cred object on server
        .then(function (response) {
          return response.data;
        })
    }

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

