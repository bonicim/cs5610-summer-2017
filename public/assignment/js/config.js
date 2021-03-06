(function() {
  angular
    .module("WebAppMaker")
    .config(config);

  function config($routeProvider) {
    $routeProvider
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
      // Website List
      .when("/user/:uid/website", {
        templateUrl: "views/website/templates/website-list.view.client.html",
        controller: "WebsiteListController",
        controllerAs: "model"
      })
      // New Website
      .when("/user/:uid/website/new", {
        templateUrl: "views/website/templates/website-new.view.client.html",
        controller: "NewWebsiteController",
        controllerAs: "model"
      })
      // Edit Website
      .when("/user/:uid/website/:wid", {
        templateUrl: "views/website/templates/website-edit.view.client.html",
        controller: "EditWebsiteController",
        controllerAs: "model"
      })
      // Page List
      .when("/user/:uid/website/:wid/page", {
        templateUrl: "views/page/templates/page-list.view.client.html",
        controller: "PageListController",
        controllerAs: "model"
      })
      // New Page
      .when("/user/:uid/website/:wid/page/new", {
        templateUrl: "views/page/templates/page-new.view.client.html",
        controller: "NewPageController",
        controllerAs: "model"
      })
      // Edit Page
      .when("/user/:uid/website/:wid/page/:pid", {
        templateUrl: "views/page/templates/page-edit.view.client.html",
        controller: "EditPageController",
        controllerAs: "model"
      })
      // Widget List
      .when("/user/:uid/website/:wid/page/:pid/widget", {
        templateUrl: "views/widget/templates/widget-list.view.client.html",
        controller: "WidgetListController",
        controllerAs: "model"
      })
      // New Widget
      .when("/user/:uid/website/:wid/page/:pid/widget/new", {
        templateUrl: "views/widget/templates/widget-chooser.view.client.html",
        controller: "NewWidgetController",
        controllerAs: "model"
      })
      // Edit Widget
      .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
        templateUrl: "views/widget/templates/widget-edit.view.client.html",
        controller: "EditWidgetController",
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
      })
    return deferred.promise;
  }
})();