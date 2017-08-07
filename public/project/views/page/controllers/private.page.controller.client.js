(function() {
  angular
    .module("Yobai")
    .controller("PrivatePageController", PrivatePageController);

  function PrivatePageController(currentUser, $location, WidgetService) {
    var vm = this;
    vm.user = undefined;

    vm.goToPublicPage = goToPublicPage;
    vm.goToEditWidget = goToEditWidget;
    vm.goToSuitorPublicPage = goToSuitorPublicPage;
    vm.goToMatchPublicPage = goToMatchPublicPage;
    vm.goToProfile = goToProfile;

    init();
    function init() {
      vm.user = currentUser;
    }

    function goToPublicPage() {
      $location.url("/user/public/" + vm.user._id);
    }

    function goToEditWidget() {

    }

    function goToSuitorPublicPage(suitorId) {
      $location.url("/user/public/" + suitorId);
    }

    function goToMatchPublicPage(matchId) {
      $location.url("/user/public/" + matchId);
    }

    function goToProfile() {
      $location.url("/profile")
    }

  }



}) ();
