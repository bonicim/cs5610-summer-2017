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
      "logout": logout,
      "checkLoggedIn": checkLoggedIn,
      "updateUser" : updateUser,
      "deleteUser" : deleteUser
    };
    return api;

    function checkLoggedIn() {
      var url = "/api/checkLoggedIn";
      return $http.get(url)
        .then(function (response) {
          return response.data; // returns user object or '0'
        });
    }

    function logout() {
      var url = "/api/logout";
      return $http.post(url)
        .then(function (response) {
          return response.data;
        })
    }

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

    function createUser(user) {
      var url = "/api/user";
      // .post takes two args: url, object to be posted
      return $http.post(url, user)
        .then(function (response) {
          return response.data;
        });
    }

    function findUserById(userId) {
      var url = "/api/user/" + userId;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function findUserByUsername(username) {
      var url = "/api/user?username=" + username;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

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

