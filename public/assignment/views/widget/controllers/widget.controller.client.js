(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController",WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

  function WidgetListController() {
    var vm = this;

  }

  function NewWidgetController() {
    var vm = this;

  }

  function EditWidgetController($routeParams, WidgetService) {
    var vm = this;
    console.log("Edit Widget check");
    vm.websiteId = $routeParams.pid;
    vm.widgets = undefined;

    function init() {
      vm.widgets = WidgetService.findWidgetsByPageId(vm.websiteId);
    }
    init();
  }

}());
