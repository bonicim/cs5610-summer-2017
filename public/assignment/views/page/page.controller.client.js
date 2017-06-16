(function() {
  angular
    .module("WebAppMaker")
    .controller("PageListController",PageListController)
    .controller("NewPageController", NewPageController)
    .controller("EditPageController", EditPageController);

  function PageListController() {
    var vm = this;

  }

  function NewPageController() {
    var vm = this;

  }

  function EditPageController($routeParams, PageService) {
    var vm = this;
    console.log("EditPage check");
    vm.websiteId = $routeParams.wid;
    vm.pages = undefined;

    function init() {
      vm.pages = PageService.findPageById(vm.websiteId);
    }
    init();
  }

}());
