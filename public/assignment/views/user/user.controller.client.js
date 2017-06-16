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
      var user = undefined;
      user = UserService.findUserByCredentials(username, password);
      if (user) {
        $location.url("/user/" + user._id);
      }
      else {
        vm.alert = "Unable to login";
      }
    }
  }

  function RegisterController() {
    var vm = this;
    console.log("register check");
    vm.register = register;

    // TODO: Implement this
    function register(username, password, vfyPassword) {

    }
  }

  function ProfileController($routeParams, UserService) {
    var vm = this;
    console.log("profile check");
    vm.userId = $routeParams.uid;
    vm.user = undefined;

    function init() {
      vm.user = UserService.findUserById(vm.userId);
    }
    init();
  }

})();