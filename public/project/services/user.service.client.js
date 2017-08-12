(function () {
  angular
    .module("Yobai")
    .factory("UserService", UserService);

  function UserService($http) {
    var api = {
      "login": login,
      "findUserByUsername" : findUserByUsername,
      "register" : register,
      "logout": logout,
      "updateUser": updateUser,
      "deleteUser": deleteUser,
      "checkLoggedIn": checkLoggedIn,
      "findUserById": findUserById,
      "findEligible": findEligible,
      "getOmdbKey": getOmdbKey,
      "addDate": addDate
    };
    return api;

    function addDate(suitorId, destId) {
      var url = "/yapi/addDate";
      var data = {suitorId: suitorId, destId: destId};
      return $http.post(url, data)
        .then(function (response) {
          return response.data;
        })
    }

    function login(username, password) {
      var url = "/yapi/login";
      var credentials = {
        username: username,
        password: password
      };
      return $http.post(url, credentials) // mapping must mirror cred object on server
        .then(function (response) {
          return response.data; // returns a promise to the controller
        })
    }

    function findUserByUsername(username) {
      var url = "/yapi/user?username=" + username;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function register(user) {
      var url = "/yapi/register";
      return $http.post(url, user)
        .then(function (response) {
          return response.data;
        });
    }

    function logout() {
      var url = "/yapi/logout";
      return $http.post(url)
        .then(function (response) {
          return response.data; // must return a promise to the controller
        })
    }

    function updateUser(userId, user) {
      var url = "/yapi/user/" + userId;
      return $http.put(url, user)
        .then(function (response) {
          return response.data;
        });
    }

    function deleteUser(userId) {
      var url = "/yapi/user/" + userId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        });
    }

    function checkLoggedIn() {
      var url = "/yapi/checkLoggedIn";
      return $http.get(url)
        .then(function (response) {
          return response.data; // returns user object or '0'
        });
    }

    function findUserById(userId) {
      var url = "/yapi/user?userId=" + userId;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function findEligible() {
      var url = "/yapi/eligible";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }

    function getOmdbKey() {
      var url = "/yenv/omdb";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }
  }

}) ();