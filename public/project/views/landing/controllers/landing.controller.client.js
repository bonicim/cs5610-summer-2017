(function() {
  angular
    .module("Yobai")
    .controller("LandingController", LandingController);

  function LandingController($location) {
    var vm = this;

    vm.goToLogin = goToLogin;
    vm.goToRegister = goToRegister;

    function goToLogin() {
      $location.url("/login");
    }

    function goToRegister() {
      $location.url("/register");
    }
  }

}) ();
