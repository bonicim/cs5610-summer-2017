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
      vm.goToEditWebsite = goToEditWebsite;
      vm.goToWebsiteList = goToWebsiteList;
      vm.goToNewWebsite = goToNewWebsite;

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

      function goToEditWebsite(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid);
      }

      function goToWebsiteList() {
        $location.url("/user/" + vm.uid + "/website");
      }

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");
      }
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
      // global vars
      var vm = this;
      vm.uid = $routeParams.uid;
      vm.websites = undefined;
      vm.websiteToAdd = undefined;

      // apis
      vm.createWebsite = createWebsite;
      vm.goToWebsiteList = goToWebsiteList;
      vm.goToProfile = goToProfile;
      vm.goToNewWebsite = goToNewWebsite;
      vm.goToEditWebsite = goToEditWebsite;

      // initializer
      function init() {
        console.log("new website check");
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm.websiteToAdd =
          { "_id": "", "name": null, "developerId": "", "description": null };
      }
      init();

      // implemented api's
      function createWebsite() {
        if(vm.websiteToAdd.name === undefined || vm.websiteToAdd.name === null || vm.websiteToAdd.name === "" ||
          vm.websiteToAdd.description === undefined || vm.websiteToAdd.description === null ||
          vm.websiteToAdd.description === "") {
          console.log(vm.websiteToAdd.name);
          alert("Name and description cannot be empty! Try again");
          return;
        }
        else {
          WebsiteService.createWebsite(vm.uid, vm.websiteToAdd);
          goToWebsiteList();
        }
      }

      function goToProfile() {
        console.log(vm.uid);
        $location.url("/user/" + vm.uid);
      }

      function goToWebsiteList() {
        $location.url("/user/" + vm.uid + "/website");
      }

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");
      }

      function goToEditWebsite(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid);
      }
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