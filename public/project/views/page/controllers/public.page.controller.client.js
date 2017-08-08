(function() {
  angular
    .module("Yobai")
    .controller("PublicPageController", PublicPageController);

  function PublicPageController($routeParams, $location, $sce, WidgetService, UserService) {
    var vm = this;
    vm.uid = $routeParams.uid;

    vm.user = undefined;
    vm.firstName = undefined;
    vm.lastName = undefined;
    vm.age = undefined;
    vm.email = undefined;
    vm.viber = undefined;
    vm.line = undefined;
    vm.isSuitor = undefined;
    vm.branch = undefined;
    vm.rank = undefined;
    vm.google = undefined;
    vm.instagram = undefined;

    vm.photoUrl = undefined;

    //males
    vm.ratings = [];
    vm.idealDate = undefined;

    // females
    vm.aboutMe = undefined;
    vm.secondPhotoUrl = undefined;
    vm.youTubeUrl = undefined;

    init();
    function init() {
      // get the user from uid via UserService; define vm.user here
      // vm.user = put code here

      // after vm.user is defined do the following:
      vm.firstName = vm.user.firstName;
      vm.lastName = vm.user.lastName;
      vm.age = vm.user.age;
      vm.email = vm.user.email;
      vm.viber = vm.user.viber;
      vm.line = vm.user.line;
      vm.isSuitor = vm.user.isSuitor;
      vm.branch = vm.user.branch;
      vm.rank = vm.user.rank;
      vm.google = vm.user.google;
      vm.instagram = vm.user.instagram;

      // get the user's photoUrl
      console.log("The image widget id is: ", vm.user.page.common[0]);
      WidgetService.findWidgetById(vm.user.page.common[0])
        .then(function(widget) {
          if (widget) {
            vm.photoUrl = widget.url;
          } else {
            vm.photoUrl = null;
          }
          console.log("Checking photoUrl: ",vm.photoUrl);
        });


      // if suitor, get the ratings list of object ids and the idealDate text
      // for females, get the second photo, aboutMe and youTube

      var pubPage = vm.user.page.public.widgets; // an array of widgetIds
      // populate the userwidgets by calling
      // what about finding all widgets for the userId and the pageLocation of PUBLIC ?
      // need a function with conditions
      if (vm.isSuitor) {

        // check widgetType for IDEALDATE and RATING


      } else {
        // check widgetType for IMAGE, YOUTUBE, ABOUTME

      }












    }

    vm.trustHtml = trustHtml;
    vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
    vm.goToProfile = goToProfile;
    vm.goToEditWidget = goToEditWidget;

    function trustHtml(html) {
      // scrub html
      return $sce.trustAsHtml(html);
    }

    function getYouTubeEmbedUrl(url) {
      var embedUrl = "https://www.youtube.com/embed/";
      var urlLinkParts = url.split('/');
      embedUrl += urlLinkParts[urlLinkParts.length - 1];
      return $sce.trustAsResourceUrl(embedUrl);
    }

    function goToProfile() {
      $location.url("/profile")
    }

    function goToEditWidget() {

    }

  }



}) ();
