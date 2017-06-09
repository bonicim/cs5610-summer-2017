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
      .when("/user/:uid/website", {
        templateUrl: "/views/website/website-list.view.client.html"
      })
      .when("/user/:uid/website/new", {
        templateUrl: "/views/website/website-new.view.client.html"
      })
      .when("/user/:uid/website/:wid", {
        templateUrl: "/views/website/website-edit.view.client.html"
      })
      .otherwise({
        redirectTo: "/"
      })

  }
})();