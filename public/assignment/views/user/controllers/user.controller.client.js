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
        .login(username, password)
        .then(goToProfile, renderError);
    }

    function goToProfile() {
      $location.url("/profile");}

    function renderError(error) {
      console.log("User not found; the returned object is the following: ", error);
      alert("User not found.");
    }

  }

  function RegisterController($location, UserService) {
    // global vars
    var vm = this;

    // functions
    vm.register = register;

    function register(username, password, vfyPassword) {
      if(!isValidInput(username,password,vfyPassword)) {return;}

      // finding a user is deemed a success but we treat it with an error message
      // not finding a user is deemed an error but we treat it with business logic

      // var userToAdd = {
      //   username : username,
      //   password : password,
      //   firstName : "",
      //   lastName : ""};

      // TODO: fix check on duplicate usernames for registering
      // return UserService
      //   .register(userToAdd)
      //   .then(goToProfile());

      UserService
        .findUserByUsername(username)
        .then(renderError,
          function () {
            var userToAdd = {
              username : username,
              password : password,
              firstName : "",
              lastName : ""};
            return UserService.register(userToAdd);
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

    function renderError(user) {
        vm.error = "Username already exists. Pick a different one." + "user is: " + user;
        alert("Username already exists. Pick a different one. Try again.");
    }

    function goToProfile() {
      $location.url("/profile");}

  }

  function ProfileController(currentUser, $location, UserService) {
    // global vars
    var vm = this;
    vm.uid = currentUser._id;
    vm.user = undefined;

    // functions
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.goToProfile = goToProfile;
    vm.goToWebsites = goToWebsites;
    vm.goToProfile = goToProfile;
    vm.logout = logout;

    // initializer
    init();
    function init() {
      vm.user = currentUser;
    }

    function renderError(error) {
      console.log(error);
      vm.error = "User not found.";
    }

    // implemented event handlers
    function logout() {
      UserService
        .logout()
        .then(goToLogin());
    }

    function updateUser(user) {
      console.log(user);
      console.log(user._id);
      UserService
        .updateUser(user._id, user)
        .then(feedbackSuccessUpdate, feedbackErrorUpdate);
    }

    function feedbackSuccessUpdate() {
      vm.feedbackSuccess = "User update succeeded.";}

    function feedbackErrorUpdate() {
      vm.feedbackError = "User update did not succeed. Try again.";}

    function deleteUser(user) {
      UserService
        .deleteUser(user._id)
        .then(goToLogin, feedbackErrorUnregister);
    }

    function feedbackErrorUnregister() {
      vm.feedbackErrorUnregister = "Unable to unregister your account. Try again.";}

    function goToLogin() {
      $location.url("/login");}

    function goToWebsites() {
      $location.url("/user/" + vm.uid + "/website");}

    function goToProfile() {
      $location.url("/user/" + vm.uid);}

  }

})();