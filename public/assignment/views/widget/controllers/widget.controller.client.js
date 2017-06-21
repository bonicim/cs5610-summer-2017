(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController",WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);

  function WidgetListController($routeParams, $location, $sce, WidgetService) {
    // global vars
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pid = $routeParams.pid;
    vm.widgets = undefined;

    // api's
    vm.trustHtml = trustHtml;
    vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
    vm.goToEditWidget = goToEditWidget;
    vm.goToListWidget = goToListWidget;
    vm.goToNewWidget = goToNewWidget;
    vm.goToPageList = goToPageList;
    vm.goToProfile = goToProfile;

    // initializer
    init();
    function init() {
      console.log("Widget List check");
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
      console.log(vm.widgets);
    }

    // implemented api's
    function trustHtml(html) {
      // scrub html
      console.log("Entering trustHtml");
      return $sce.trustAsHtml(html);
    }

    function getYouTubeEmbedUrl(url) {
      console.log("Entering embedUrl");
      var embedUrl = "https://www.youtube.com/embed/";
      var urlLinkParts = url.split('/');
      embedUrl += urlLinkParts[urlLinkParts.length - 1];
      return $sce.trustAsResourceUrl(embedUrl);
    }

    function goToEditWidget(wgid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
    }

    function goToListWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }

    function goToNewWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new");
    }

    function goToPageList() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
    }

    function goToProfile() {
      console.log(vm.uid);
      $location.url("/user/" + vm.uid);
    }

  }

  function NewWidgetController($routeParams, $location, WidgetService) {
    // global vars
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pid = $routeParams.pid;

    // apis
    vm.createWidget = createWidget;
    vm.goToProfile = goToProfile;
    vm.goToEditWidget = goToEditWidget;
    vm.goToListWidget = goToListWidget;

    // initializer
    init();
    function init() {
      vm.widgetToAdd =  { "_id": null, "widgetType": null, "pageId": null };
      console.log("New Widget check");
    }

    // implemented apis
    function createWidget(widgetType) {
      var widgetToAdd = { "_id": null, "widgetType": widgetType};
      console.log(widgetToAdd._id);
      widgetToAdd = WidgetService.createWidget(vm.pid, widgetToAdd);
      console.log(widgetToAdd._id);
      goToEditWidget(widgetToAdd._id);
    }

    function goToProfile() {
      $location.url("/user/" + vm.uid);
    }

    function goToEditWidget(wgid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
    }

    function goToListWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }
  }

  function EditWidgetController($routeParams, $location, WidgetService) {
    // global vars
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pid = $routeParams.pid;
    vm.wgid = $routeParams.wgid;
    vm.widgets = undefined;
    vm.widget = undefined;
    vm.widthDisplay = undefined;

    // api's
    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;
    vm.convertStringToNumber = convertStringToNumber;
    vm.goToListWidget = goToListWidget;
    vm.goToNewWidget = goToNewWidget;
    vm.goToEditWidget = goToEditWidget;
    vm.goToProfile = goToProfile;

    // initializer
    function init() {
      console.log("Edit Widget check");
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
      vm.widget = WidgetService.findWidgetsById(vm.wgid);
      vm.widthDisplay = parseInt(vm.widget.width);
    }
    init();

    // implemented api's
    function updateWidget(widget) {
      console.log(vm.wgid);
      console.log(widget);
      WidgetService.updateWidget(vm.wgid, widget);
      console.log(vm.widgets);
      goToListWidget();
    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.wgid);
      goToListWidget();
    }



    function convertStringToNumber(text) {
      return parseInt(text);
    }

    function goToListWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }

    function goToNewWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new");
    }

    function goToEditWidget(wgid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
    }

    function goToProfile() {
      console.log(vm.uid);
      $location.url("/user/" + vm.uid);
    }

  }

}());
