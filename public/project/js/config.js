(function() {
  angular
    .module("Yobai")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      // Test
      .when("/test", {
        templateUrl: "view/test/templates/test.page.html",
        controller: "TestController",
        controllerAs: "model"
      })
      // Login
      .when("/login", {
          templateUrl: "views/user/templates/login.view.client.html",
          controller: "LoginController",
          controllerAs: "model"
      })
      // default
      .when("/", {
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
  }

})();
