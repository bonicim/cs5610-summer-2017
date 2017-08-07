(function() {
  angular
    .module("Yobai")
    .controller("LoginController", LoginController);

  function LoginController($location, UserService) {
    var vm = this;

    vm.login = login;
    vm.goToPrivatePage = goToPrivatePage;
    vm.goToRegister = goToRegister;

    function login(username, password) {
      UserService
        .login(username, password)
        .then(function (user) {
           goToPrivatePage(user)
          },
          renderError);
    }

    function goToPrivatePage(user) {
      $location.url("/user/private");
    }

    function goToRegister() {
      $location.url("/register");
    }

    function renderError(error) {
      console.log("User not found; the returned object is the following: ", error);
      alert("User not found.");
    }
  }

}) ();
