(function() {
  angular
    .module("WebAppMaker")
    .controller("WidgetListController",WidgetListController)
    .controller("NewWidgetController", NewWidgetController)
    .controller("EditWidgetController", EditWidgetController);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      WidgetService
        .findWidgetsByPageId(vm.pid)
        .then(bindWidgets);
    }

    function bindWidgets(widgets) {
      vm.widgets = widgets;
      console.log("Completed initialization for Widget List for page id: " + vm.pid);
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


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    }

    // implemented apis
    function createWidget(widgetType) {
      WidgetService
        .createWidget(vm.pid, widgetType)
        .then(goToEditWidgetPage);
    }

    function goToProfile() {
      $location.url("/user/" + vm.uid);}

    function goToEditWidgetPage(response) {
      goToEditWidget(response._id);
    }

    function goToEditWidget(wgid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);}

    function goToListWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");}
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    // functions
    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;
    vm.convertStringToNumber = convertStringToNumber;
    vm.goToListWidget = goToListWidget;
    vm.goToNewWidget = goToNewWidget;
    vm.goToEditWidget = goToEditWidget;
    vm.goToProfile = goToProfile;

    // initializer
    init();
    function init() {
      WidgetService
        .findWidgetsByPageId(vm.pid)
        .then(bindWidgets);
    }

    function bindWidgets(widgets) {
      vm.widgets = widgets;
      vm.widget = (widgets.filter(function (el) {return el._id === vm.wgid;}))[0];
      console.log("Completed initialization of widget id: " + vm.wgid);
    }

    // implemented functions
    function updateWidget(widget) {
      WidgetService.updateWidget(vm.wgid, widget);
      goToListWidget();
    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.wgid);
      goToListWidget();
    }

    function convertStringToNumber(text) {
      return parseInt(text);}

    function goToListWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");}

    function goToNewWidget() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new");}

    function goToEditWidget(wgid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);}

    function goToProfile() {
      $location.url("/user/" + vm.uid);}

  }

}());
