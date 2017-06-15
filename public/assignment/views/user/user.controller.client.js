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
      // var user = null;
      // user = UserService.findUserByCredential(vm.username, vm.password);
      // if (user) {
      //   //locationurl
      // }
      // else {
      //   $location
      // }
      // // if user login successful
      // $location.url("#!/user/" + user.id);
      //
      // //else
      //
      // $location("#!/register");
    }
  }

  function RegisterController() {
    var vm = this;
    console.log("register check");
  }

  function ProfileController() {
    var vm = this;
    console.log("profile check");
  }
})();