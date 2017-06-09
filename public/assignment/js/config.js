(function() {
  angular
    .module("WebAppMaker")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "/views/user/login.view.client.html"
      })
      .when("/", {
        templateUrl: "/views/user/login.view.client.html"
      })
      .when("/register", {
        templateUrl: "/views/user/register.view.client.html"
      })
      .when("/user/:uid", {
        templateUrl: "/views/user/profile.view.client.html"
      })
      .otherwise({
        redirectTo: "/"
      })

  }
})();