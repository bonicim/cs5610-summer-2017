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
    function init() {
      console.log("login check");
    }
    init();

    function login(username, password) {
      var user = UserService.findUserByCredentials(username, password);
      if (user) {
        console.log("user found");
        $location.url("/user/" + user._id);
      }
      else {
        alert("Username and password do not match. Try again.");
        return;
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
        .then(renderUser, userError);
    }

    function renderUser(user) {
      console.log(user);
      vm.user = user;
    }

    function userError(error) {
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