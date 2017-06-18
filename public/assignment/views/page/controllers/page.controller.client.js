(function() {
  angular
    .module("WebAppMaker")
    .controller("PageListController",PageListController)
    .controller("NewPageController", NewPageController)
    .controller("EditPageController", EditPageController);

  function PageListController($routeParams, PageService) {
    // global var
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pages = undefined;

    // initializer
    init();
    function init() {
      vm.pages = PageService.findPageByWebsiteId(vm.wid);
    }

    // api's


    // implemented api's


  }

  function NewPageController() {
    var vm = this;

  }

  function EditPageController($routeParams, PageService) {
    var vm = this;
    console.log("EditPage check");
    vm.wid = $routeParams.wid;

    vm.pages = undefined;

    function init() {
      vm.pages = PageService.findPageById(vm.wid);
    }
    init();
  }

}());
