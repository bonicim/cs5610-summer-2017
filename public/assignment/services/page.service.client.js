(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);

  function PageService() {
    // temporary database
    var pages = [{ "_id": "321", "name": "Post 1", "wid": "456", "description": "Lorem" },
      { "_id": "432", "name": "Post 2", "wid": "456", "description": "Lorem" },
      { "_id": "543", "name": "Post 3", "wid": "456", "description": "Lorem" }];


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
      var id = generateId();
      var pageToAdd = {_id : id, name : page.name, wid : websiteId, description : page.description};
      pages.push(pageToAdd);

    }

    function generateId() {
      function getMaxId(maxId, page) {
        var currId = parseInt(page._id);
        if (maxId > currId) {
          console.log("We should enter here if current unique id greater than the current id that we are comparing.")
          console.log(maxId);
          return maxId;
        }
        else {
          console.log("The current unique id has changed and increased by one from the current id.")
          console.log(currId + 1);
          return currId + 1;
        }
      }
      var uniqueId = pages.reduce(getMaxId, 0).toString();
      console.log("We generated a unique id. It is: " + uniqueId);
      return uniqueId;
    }

    function findPageByWebsiteId(websiteId) {
      var key;
      var pagesResult = [];
      for (key in pages) {
        var page = pages[key];
        if (parseInt(page.wid) === parseInt(websiteId)) {
          pagesResult.push(page);
        }
      }
      return pagesResult;
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
      deletePage(pageId);
      pages.push(page);
      console.log(pages);
    }

    function deletePage(pageId) {
      pages = pages.filter(function (el) { return parseInt(el._id) !== parseInt(pageId);})
      console.log(pages);
    }

  }

})();
