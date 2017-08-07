(function() {
  angular
    .module("Yobai")
    .controller("PublicPageController", PublicPageController);

  function PublicPageController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.widgets = undefined;

    init();
    function init() {
      // TODO: define widgets here
    }

    vm.goToProfile = goToProfile;
    vm.goToEditWidget = goToEditWidget;

    function goToProfile() {
      $location.url("/profile")
    }

    function goToEditWidget() {

    }

  }



}) ();
