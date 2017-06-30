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

      // functions
      vm.goToProfile = goToProfile;
      vm.goToEditWebsite = goToEditWebsite;
      vm.goToWebsiteList = goToWebsiteList;
      vm.goToNewWebsite = goToNewWebsite;
      vm.goToPageList = goToPageList;

      // initializer
      init();
      function init() {
        WebsiteService
          .findWebsitesByUser(vm.uid)
          .then(bindWebsites);
        console.log("Website List for user " + vm.uid);
      }

      function bindWebsites(websites) {
        vm.websites = websites;}

      // implemented functions
      function goToProfile() {
        $location.url("/user/" + vm.uid);}

      function goToEditWebsite(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid);}

      function goToWebsiteList() {
        $location.url("/user/" + vm.uid + "/website");}

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");}

      function goToPageList(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid + "/page");}
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      vm.goToPageList = goToPageList;

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
        $location.url("/user/" + vm.uid);}

      function goToWebsiteList() {
        $location.url("/user/" + vm.uid + "/website");}

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");}

      function goToEditWebsite(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid);}

      function goToPageList(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid + "/page");}
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function EditWebsiteController($routeParams, $location, WebsiteService) {
      // global vars
      var vm = this;
      vm.wid = $routeParams.wid;
      vm.uid = $routeParams.uid;
      vm.websiteList = undefined;
      vm.website = undefined;

      // functions
      vm.updateWebsite = updateWebsite;
      vm.deleteWebsite = deleteWebsite;
      vm.goToWebsiteList = goToWebsiteList;
      vm.goToEditWebsite = goToEditWebsite;
      vm.goToProfile = goToProfile;
      vm.goToNewWebsite = goToNewWebsite;
      vm.goToPageList = goToPageList;

      // initializer
      init();
      function init() {
        WebsiteService
          .findWebsitesByUser(vm.uid)
          .then(bindWebsite);
      }

      // implemented functions
      function bindWebsite(websites) {
        vm.websiteList = websites;
        // filters the list of websites and returns a list of exactly one website
        vm.website = (websites.filter(function (el) {return el._id === vm.wid;}))[0];
        console.log("Edit Website page for user " + vm.uid + "'s " + vm.website.name);
      }

      function updateWebsite(website) {
        WebsiteService
          .updateWebsite(vm.wid, website)
          .then(goToWebsiteList());
      }

      function deleteWebsite() {
        WebsiteService.
          deleteWebsite(vm.wid)
          .then(goToWebsiteList());
      }

      function goToWebsiteList() {
        console.log("returned from update");
        $location.url("/user/" + vm.uid + "/website");}

      function goToEditWebsite(uid, wid) {
        $location.url("/user/" + uid + "/website/" + wid);}

      function goToProfile() {
        console.log(vm.uid);
        $location.url("/user/" + vm.uid);}

      function goToNewWebsite() {
        $location.url("/user/" + vm.uid + "/website/new");}

      function goToPageList(wid) {
        $location.url("/user/" + vm.uid + "/website/" + wid + "/page");}

    }

}());