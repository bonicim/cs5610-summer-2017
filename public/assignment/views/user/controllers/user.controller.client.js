(function() {
  angular
    .module("WebAppMaker")
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
    .controller("ProfileController", ProfileController);

  function LoginController($location, UserService) {
    var vm = this;
    vm.login = login;
    console.log("login check");

    function login(username, password) {
      var user = UserService.findUserByCredentials(username, password);
      if (user) {
        // redirect to Profile view
        $location.url("/user/" + user._id);
      }
      else {
        vm.alert = "Unable to login";
      }
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
      // validate the input
      if (username === undefined || username === null || username === "" || password === undefined || password === "") {
        vm.error = "Username and password must not be empty.";
        alert("Username and password must not be empty. Try again.");
        return;
      }

      // validate password match
      if (password !== vfyPassword) {
        vm.error = "Passwords do not match. Try again. Make sure CAPSLOCK is off.";
        alert("Passwords do not match. Ensure CAPSLOCK is off. Try again.");
        return;
      }

      // validate for duplicate
      var user = UserService.findUserByUsername(username);
      if (user !== null) {
        vm.error = "Username already exists. Pick a different one.";
        alert("Username already exists. Pick a different one. Try again.");
        return;
      }

      // we've passed all the tests; we can add a new user to our db
      var userToAdd = {username : username, password : password, firstName : "", lastName : ""};
      UserService.createUser(userToAdd);
      var newUser = UserService.findUserByUsername(username);
      goToProfile(newUser);
    }

    // helpers
    function goToProfile(user) {
      $location.url("/user/" + user._id);
    }

  }

  function ProfileController($routeParams, UserService) {
    var vm = this;
    console.log("profile check");
    vm.uid = $routeParams.uid;
    vm.user = undefined;

    function init() {
      vm.user = UserService.findUserById(vm.uid);
    }
    init();
  }

})();