(function() {
  angular
    .module("WebAppMaker")
    .controller("WebsiteListController", WebsiteListController)
    .controller("NewWebsiteController", NewWebsiteController)
    .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
      var vm = this;
      vm.uid = $routeParams.uid;
      vm.websites = undefined;

      function init() {
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
      }
      init();
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

    }

}());