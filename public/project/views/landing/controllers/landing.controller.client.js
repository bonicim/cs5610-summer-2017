(function() {
  angular
    .module("Yobai")
    .controller("LandingController", LandingController);

  function LandingController($location) {
    var vm = this;

    vm.goToLogin = goToLogin;

    function goToLogin() {
      $location.url("/login");
    }
  }

}) ();
