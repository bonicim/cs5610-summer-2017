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
      // Register
      .when("/register", {
        templateUrl: "views/user/templates/register.view.client.html",
        controller: "RegisterController",
        controllerAs: "model"
      })
      // Profile
      .when("/profile", {
        templateUrl: "views/user/templates/profile.view.client.html",
        controller: "ProfileController",
        controllerAs: "model",
        // the following things must be resolved before you are allowed to see the profile page
        resolve: {
          currentUser: checkLoggedIn // promise object is bound to the variable; it is injectible to the controller
        }
      })
      // Private Page
      .when("/user/private", {
        templateUrl: "views/page/templates/private.page.view.client.html",
        controller: "PrivatePageController",
        controllerAs: "model",
        // the following things must be resolved before you are allowed to see the private page
        resolve: {
          currentUser: checkLoggedIn // promise object is bound to the variable; it is injectible to the controller
        }
      })
      // Public Page
      .when("/user/public/:uid", {
        templateUrl: "views/page/templates/public.page.view.client.html",
        controller: "PublicPageController",
        controllerAs: "model"
      })
      // Edit Widget
      .when("/user/:uid/public/:wid/:wgid", {
        templateUrl: "views/page/templates/widget-edit.view.client.html",
        controller: "EditWidgetController",
        controllerAs: "model"
      })
      // Test
      .when("/test", {
        templateUrl: "views/test/templates/test.page.html",
        controller: "TestController",
        controllerAs: "model"
      })
      .otherwise({
        redirectTo: "/"
      });
  }

  function checkLoggedIn($q, $location, UserService) {
    var deferred = $q.defer();
    UserService
      .checkLoggedIn() // returns promise with a user object or a '0'
      .then(function (currentUser) {
        if (currentUser === '0') {
          deferred.reject();
          $location.url('/login'); // if no user, go to login page
        } else {
          deferred.resolve(currentUser);
        }
      });
    return deferred.promise;
  }

})();
