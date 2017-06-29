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

    // initializer
    init();
    function init() {
      console.log("login check");
    }

    function login(username, password) {
      UserService
        .findUserByCredentials(username, password)
        .then(goToProfile, renderError);
    }

    function goToProfile(user) {
      console.log("user found");
      console.log(user._id);
      $location.url("/user/" + user._id);
    }

    function renderError(error) {
      console.log(error);
      alert("User not found.");
    }

  }

  function RegisterController($location, UserService) {
    // global vars
    var vm = this;
    console.log("register check");

    // api's
    vm.register = register;

    // implemented api's
    function register(username, password, vfyPassword) {
      if(!isValidInput(username,password,vfyPassword)) {return;}

      // finding a user is deemed a success but we treat it with an error message
      // not finding a user is deemed an error but we treat it with business logic
      UserService
        .findUserByUsername(username)
        .then(renderError, createUser);
    }

    function createUser() {
      var userToAdd = {username : username, password : password, firstName : "", lastName : ""};
      UserService.createUser(userToAdd);
      var newUser = UserService.findUserByUsername(username);
      goToProfile(newUser);
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
    // page is initialized using server-side services
    init();

    function init() {
      console.log("profile check");
      UserService
        .findUserById(vm.uid)
        .then(bindUser, renderError);
    }

    function bindUser(user) {
      vm.user = user;
    }

    function renderError(error) {
      console.log(error);
      vm.error = "User not found.";
    }

    // implemented api's
    function updateUser() {
      UserService.updateUser(vm.uid, vm.user);
      goToProfile();
    }

    function goToWebsites() {
      $location.url("/user/" + vm.uid + "/website");
    }

    function goToProfile() {
      $location.url("/user/" + vm.uid);
    }

  }

})();