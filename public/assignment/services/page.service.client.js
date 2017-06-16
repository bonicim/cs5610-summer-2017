(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);

  function PageService() {
    // temporary database
    var pages = [{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
      { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
      { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];


    // api interface object
    var api = {
      "createPage" : createPage,
      "findPageByWebsiteId" : findPageByWebsiteId,
      "findPageById" : findPageById,
      "updatePage" : updatePage,
      "deletePage" : deletePage
    };

    return api;

    function createPage(websiteId, page) {

    }

    function findPageByWebsiteId(websiteId) {

    }

    function findPageById(pageId) {
      var key;
      for (key in pages) {
        var page = pages[key];
        if (parseInt(page._id) === parseInt(pageId)) {
          return page;
        }
      }
      return null;
    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {

    }

  }

})();
