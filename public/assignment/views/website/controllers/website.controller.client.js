(function() {
  angular
    .module("WebAppMaker")
    .controller("WebsiteListController", WebsiteListController)
    .controller("NewWebsiteController", NewWebsiteController)
    .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
      // global vars
      var vm = this;
      vm.uid = $routeParams.uid;
      vm.websites = undefined;

      // api's
      vm.goToProfile = goToProfile;

      // initializer
      function init() {
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
      }
      init();

      // implemented api's
      function goToProfile() {
        console.log(vm.uid);
        $location.url("/user/" + vm.uid);
      }
    }

    function NewWebsiteController() {
      var vm = this;

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
      // global vars
      var vm = this;
      vm.wid = $routeParams.wid;
      vm.uid = $routeParams.uid;
      vm.websiteList = undefined;
      vm.website = undefined;

      // api's
      vm.updateWebsite = updateWebsite;
      vm.deleteWebsite = deleteWebsite;
      vm.goToWebsiteList = goToWebsiteList;
      vm.goToEditWebsite = goToEditWebsite;
      vm.goToProfile = goToProfile;
      vm.goToNewWebsite = goToNewWebsite;

      // initializes all uninitialized global variables
      init();
      function init() {
        vm.websiteList = WebsiteService.findWebsitesByUser(vm.uid);
        vm.website = (vm.websiteList.filter(function (el) {return el._id === vm.wid;}))[0];
        console.log("Edit Website check");
        console.log(vm.websiteList)
        console.log(vm.website);
      }

      // implemented api's
      function updateWebsite(website) {
        console.log(vm.wid);
        console.log(website);
        WebsiteService.updateWebsite(vm.wid, website);
        goToWebsiteList();
      }

      function deleteWebsite() {
        WebsiteService.deleteWebsite(vm.wid);
        goToWebsiteList();
      }

      // helpers
      function goToWebsiteList() {
        $location.url("/user/" + vm.uid + "/website");
      }

      function goToEditWebsite(uid, wid) {
        $location.url("/user/" + uid + "/website/" + wid);
      }

      function goToProfile() {
        console.log(vm.uid);
        $location.url("/user/" + vm.uid);
      }

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");
      }

    }

}());