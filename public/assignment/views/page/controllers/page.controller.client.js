(function() {
  angular
    .module("WebAppMaker")
    .controller("PageListController",PageListController)
    .controller("NewPageController", NewPageController)
    .controller("EditPageController", EditPageController);

  function PageListController($routeParams, $location, PageService) {
    // global var
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pages = undefined;

    // initializer
    init();
    function init() {
      PageService
        .findPageByWebsiteId(vm.wid)
        .then(bindPages);
      console.log("Initialized pages for website id: " + vm.wid);
    }

    function bindPages(pages) {
      vm.pages = pages;
    }

    // api's
    vm.goToProfile = goToProfile;
    vm.goToWebsiteList = goToWebsiteList;
    vm.goToNewPage = goToNewPage;
    vm.goToWidgetList = goToWidgetList;
    vm.goToEditPage = goToEditPage;

    // implemented api's
    function goToProfile() {
      $location.url("/user/" + vm.uid);}

    function goToWebsiteList() {
      $location.url("/user/" + vm.uid + "/website");}

    function goToNewPage() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/new");}

    function goToWidgetList(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid + "/widget");}

    function goToEditPage(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid);}
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  function NewPageController($routeParams, $location, PageService) {
    // global vars
    var vm = this;
    vm.wid = $routeParams.wid;
    vm.uid = $routeParams.uid;
    vm.pages = undefined;
    vm.pageName = undefined;
    vm.pageDescription = undefined;
    vm.pageToAdd = undefined;

    // api's
    vm.createPage = createPage;
    vm.goToProfile = goToProfile;
    vm.goToWebsiteList = goToWebsiteList;
    vm.goToNewPage= goToNewPage;
    vm.goToWidgetList = goToWidgetList;
    vm.goToEditPage = goToEditPage;

    // initializer
    init();
    function init() {
      vm.pageName = null;
      vm.pageDescription = null;
      PageService
        .findPageByWebsiteId(vm.wid)
        .then(bindPages);
    }
    function bindPages(pages) {
      vm.pages = pages;
    }

    // implemented api's
    function createPage(name, description) {
      if (!isValidInput(name, description)) {return;}

      // input validation passed, call the service to create a page
      PageService
        .createPage(vm.wid, name, description)
        .then(goToPageList());
    }

   function isValidInput(name, description) {
       if(vm.pageName === undefined || vm.pageName === null || vm.pageName === "" ||
           vm.pageDescription === undefined || vm.pageDescription === null ||
           vm.pageDescription === "") {
           alert("Name and description cannot be empty! Try again");
           return false;
       }
       return true;
   }

    function goToPageList() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid +"/page");}

    function goToProfile() {
      $location.url("/user/" + vm.uid);}

    function goToWebsiteList() {
      $location.url("/user/" + vm.uid + "/website");}

    function goToNewPage() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/new");}

    function goToWidgetList(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid + "/widget");}

    function goToEditPage(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid);}

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function EditPageController($routeParams, $location, PageService) {
    // global vars
    var vm = this;
    vm.pid = $routeParams.pid;
    vm.wid = $routeParams.wid;
    vm.uid = $routeParams.uid;
    vm.page = undefined;
    vm.pages = undefined;

    // api's
    vm.updatePage = updatePage;
    vm.deletePage = deletePage;
    vm.goToProfile = goToProfile;
    vm.goToWebsiteList = goToWebsiteList;
    vm.goToNewPage= goToNewPage;
    vm.goToWidgetList = goToWidgetList;
    vm.goToEditPage = goToEditPage;

    // initializer
    init();
    function init() {
      PageService
        .findPageByWebsiteId(vm.wid)
        .then(bindPages);
    }

    function bindPages(pages) {
      vm.pages = pages;
      vm.page = (pages.filter(function (el) {return el._id === vm.pid;}))[0];
      console.log("Initialized Edit Page for page id: " + vm.page._id);
    }

    // implemented api's
    function updatePage(name, description) {
      PageService
        .updatePage(vm.pid, name, description)
        .then(goToPageList());
    }

    function deletePage() {
      PageService
        .deletePage(vm.pid, vm.wid)
        .then(goToPageList());
    }

    function goToPageList() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid +"/page");}

    function goToProfile() {
      $location.url("/user/" + vm.uid);}

    function goToWebsiteList() {
      $location.url("/user/" + vm.uid + "/website");}

    function goToNewPage() {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/new");}

    function goToWidgetList(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid + "/widget");}

    function goToEditPage(pid) {
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + pid);}

  }

}());
