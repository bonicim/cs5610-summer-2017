(function() {
  angular
    .module("WebAppMaker")
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
    .controller("ProfileController", ProfileController);

  function LoginController($location, UserService) {
    // global vars
    var vm = this;

    // api's
    vm.login = login;

    // implemented api's
    function login(username, password) {
      UserService
        .findUserByCredentials(username, password)
        .then(goToProfile, renderError);
    }

    function goToProfile(user) {
      $location.url("/user/" + user._id);
      console.log("Going to Profile of user " + user._id);
    }

    function renderError(error) {
      console.log(error);
      alert("User not found.");
    }

  }

  function RegisterController($location, UserService) {
    // global vars
    var vm = this;

    // api's
    vm.register = register;

    // implemented api's
    /**
     * Calls a service that creates a new user for this application.
     * @param username
     * @param password
     * @param vfyPassword
     */
    function register(username, password, vfyPassword) {
      if(!isValidInput(username,password,vfyPassword)) {return;}

      // finding a user is deemed a success but we treat it with an error message
      // not finding a user is deemed an error but we treat it with business logic
      UserService
        .findUserByUsername(username)
        .then(renderError,
          function () {
            var userToAdd = {
              username : username,
              password : password,
              firstName : "",
              lastName : ""};
            return UserService.createUser(userToAdd);
          }
        )
        .then(goToProfile);
    }

    // helpers
    function isValidInput(username, password, vfyPassword) {
      return !hasEmptyInput(username, password) && hasMatchingPasswords(password,vfyPassword);
    }

    function hasEmptyInput(username, password) {
      if (username === undefined || username === null || username === "" || password === undefined || password === "") {
        vm.error = "Username and password must not be empty.";
        alert("Username and password must not be empty. Try again.");
        return true;
      }
      return false;
    }

    function hasMatchingPasswords(password, vfyPassword) {
      if (password !== vfyPassword) {
        vm.error = "Passwords do not match. Try again. Make sure CAPSLOCK is off.";
        alert("Passwords do not match. Ensure CAPSLOCK is off. Try again.");
        return false;
      }
      return true;
    }

    function renderError() {
        vm.error = "Username already exists. Pick a different one.";
        alert("Username already exists. Pick a different one. Try again.");
    }

    function goToProfile(user) {
      $location.url("/user/" + user._id);
    }

  }

  function ProfileController($routeParams, $location, UserService) {
    // global vars
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.user = undefined;

    // api's
    vm.updateUser = updateUser;
    vm.goToWebsites = goToWebsites;
    vm.goToProfile = goToProfile;

    // initializer
    init();
    function init() {
      UserService
        .findUserById(vm.uid)
        .then(bindUser, renderError);
      console.log("Profile is initialized for user " + vm.uid);
    }

    function bindUser(user) {
      vm.user = user;
    }

    function renderError(error) {
      console.log(error);
      vm.error = "User not found.";
    }

    // implemented api's
    function updateUser(user) {
      UserService
        .updateUser(user._id, user)
        .then(feedbackSuccess, feedbackError);
    }

    function feedbackSuccess() {
      vm.feedbackSuccess = "User update succeeded.";
    }

    function feedbackError() {
      vm.feedbackError = "User update did not succeed. Try again.";
    }

    function goToWebsites() {
      $location.url("/user/" + vm.uid + "/website");
    }

    function goToProfile() {
      $location.url("/user/" + vm.uid);
    }

  }

})();