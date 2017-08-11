(function() {
  angular
    .module("Yobai")
    .controller("ProfileController", ProfileController);

  function ProfileController(currentUser, $location, UserService) {
    // global vars
    var vm = this;
    vm.uid = currentUser._id;
    vm.user = undefined;

    // functions
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.goToProfile = goToProfile;
    vm.goToPrivatePage = goToPrivatePage;
    vm.goToProfile = goToProfile;
    vm.logout = logout;

    // initializer
    init();
    function init() {
      vm.user = currentUser;
    }

    // implemented event handlers
    function logout() {
      UserService
        .logout()
        .then(goToLogin());
    }

    function updateUser(user) {
      console.log(user);
      console.log(user._id);
      UserService
        .updateUser(user._id, user)
        .then(feedbackSuccessUpdate, feedbackErrorUpdate);
    }

    function feedbackSuccessUpdate() {
      vm.feedbackSuccess = "User update succeeded.";}

    function feedbackErrorUpdate() {
      vm.feedbackError = "User update did not succeed. Try again.";}

    function deleteUser(user) {
      UserService
        .deleteUser(user._id)
        .then(goToLogin, feedbackErrorUnregister);
    }

    function feedbackErrorUnregister() {
      vm.feedbackErrorUnregister = "Unable to unregister your account. Try again.";}

    function goToLogin() {
      $location.url("/login");}

    function goToPrivatePage() {
      $location.url("/user/private");}

    function goToProfile() {
      $location.url("/login");}
  }

    function renderError(error) {
    console.log(error);
    vm.error = "User not found.";
  }
}) ();
