(function() {
  angular
    .module("Yobai")
    .controller("RegisterController", RegisterController);

  function RegisterController($location, UserService) {
    var vm = this;

    vm.register = register;
    vm.goToProfile = goToProfile;

    function register(username, password, vfyPassword) {
      if(!isValidInput(username,password,vfyPassword)) {return;}
      // finding a user is deemed a success but we treat it with an error message
      // not finding a user is deemed an error but we treat it with business logic
      UserService
        .findUserByUsername(username)
        .then(renderError, registerNewUser(username, password))
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

    function goToProfile() {
      $location.url("/profile");
    }

    function renderError(user) {
      vm.error = "Username already exists. Pick a different one." + "user is: " + user;
      alert("Username already exists. Pick a different one. Try again.");
    }

    function registerNewUser(username, password) {
      var userToAdd = {
        username : username,
        password : password,
        firstName : "",
        lastName : ""};
      return UserService.register(userToAdd);
    }
  }



}) ();
