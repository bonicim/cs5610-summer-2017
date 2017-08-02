(function() {
  angular
    .module("Yobai")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/test", {
          templateUrl: "view/test/template/test.page.html",
          controller: "TestController",
          controllerAs: "model"
        })
  }

})();
