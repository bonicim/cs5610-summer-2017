(function() {
  angular
    .module("Yobai")
    .controller("PrivatePageController", PrivatePageController);

  function PrivatePageController(currentUser, $location, WidgetService, UserService) {
    var vm = this;
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
    vm.matches = []; // an array of other users
    vm.mates = []; // an array of other users
    vm.eligibleMates = []; // an array of only males

    vm.goToPublicPage = goToPublicPage;
    // vm.goToEditWidget = goToEditWidget;
    // vm.goToSuitorPublicPage = goToSuitorPublicPage;
    // vm.goToMatchPublicPage = goToMatchPublicPage;
    // vm.goToProfile = goToProfile;

    init();

    function init() {
      vm.user = currentUser;
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

      // get image widget from common page (it's the first one)
      console.log("The image widget id is: ", vm.user.page.common.widgets[0]);
      WidgetService.findWidgetById(vm.user.page.common.widgets[0])
        .then(function (widget) {
          if (widget) {
            vm.photoUrl = widget.url;
          } else {
            vm.photoUrl = null;
          }
          console.log("Checking photoUrl: ", vm.photoUrl);
        });


      // get the appropriate array of actual matches or mates for the user
      // for matches: firstName, age,  (later: image)
      // for mates: firstName, age, rank, branch,
      if (vm.isSuitor) {
        var matchesArr = vm.user.page.private.matches;
        console.log("The array of matches is: ", matchesArr);
        var lenArr = matchesArr.length;

        for (var index = 0; index < lenArr; index++) {
          UserService.findUserById(matchesArr[index])
            .then(function (user) {
              if (user) {
                vm.matches.push(user);
              }
            });
        }

        console.log("Checking matches array: ", vm.matches);
      }
      else {
        var matesArr = vm.user.page.private.mates;
        console.log("The array of matches is: ", matesArr);
        var lenArr = matesArr.length;

        for (var index = 0; index < lenArr; index++) {
          UserService.findUserById(matesArr[index])
            .then(function (user) {
              if (user) {
                vm.mates.push(user);
              }
            });
        }

        UserService.findEligible()
          .then(function (eligibleArr) {
            vm.eligibleMates = eligibleArr;
            console.log("eligible mates are", vm.eligibleMates);
          });
      }

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
