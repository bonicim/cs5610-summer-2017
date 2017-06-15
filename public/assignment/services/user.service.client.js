(function () {
  angular
    .module("WebAppMaker")
    .factory("UserService", UserService);

  function UserService() {
    // temporary database
    var users = [];

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

