(function() {
  angular
    .module("Yobai")
    .config(config);

  function config($routeProvider) {
    $routeProvider
    // landing
      .when("/", {
        templateUrl: "views/landing/templates/landing.view.client.html",
        controller: "LandingController",
        controllerAs: "model"
      })
      // Login
      .when("/login", {
          templateUrl: "views/user/templates/login.view.client.html",
          controller: "LoginController",
          controllerAs: "model"
      })
      // add more views







      // widget
      .when("/widget", {
        templateUrl: "views/widget/templates/widget.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      })
      // Test
      .when("/test", {
        templateUrl: "views/test/templates/test.page.html",
        controller: "TestController",
        controllerAs: "model"
      })
  }

})();
