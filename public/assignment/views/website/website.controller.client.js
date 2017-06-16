(function() {
  angular
    .module("WebAppMaker")
    .controller("WebsiteListController", WebsiteListController)
    .controller("NewWebsiteController", NewWebsiteController)
    .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController() {
      var vm = this;
    }

    function NewWebsiteController() {
      var vm = this;

    }

    function EditWebsiteController($routeParams, WebsiteService) {
      var vm = this;
      console.log("editWebsite check");
      vm.websiteId = $routeParams.wid;
      vm.website = undefined;

      function init() {
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
      }
      init();
    }

}());