(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);
    var pages = [{ "_id": "321", "name": "Post 1", "wid": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "wid": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "wid": "456", "description": "Lorem" }];

  // errors are handled by controller
  function PageService($http) {

    // api interface object
    var api = {
      "createPage" : createPage,
      "findPageByWebsiteId" : findPageByWebsiteId,
      "findPageById" : findPageById,
      "updatePage" : updatePage,
      "deletePage" : deletePage
    };
    return api;

      /**
       * Creates a new page for the given website
       * @param websiteId
       * @param page
       * @returns Page object
       */
    function createPage(websiteId, name, description) {
      var pageToAdd = {
          "name": name,
          "description": description
      }
      var url = "/api/website/" + websiteId + "/page";
        return $http.post(url, pageToAdd)
            .then(function (response) {
                return response.data;
            });
    }

    /**
     * Returns all pages for a given website id
     * @param websiteId
     * @returns {*}
     */
    function findPageByWebsiteId(websiteId) {
      var url = "/api/website/" + websiteId + "/page";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }

    /**
     * Returns a page for a given page id
     * @param pageId
     * @returns {*}
     */
    function findPageById(pageId) {
      var url = "/api/page/" + pageId;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }

    function updatePage(pageId, name, description) {
      var page = {
          "_id" : null,
          "wid" : null,
          "name": name,
          "description": description
        };
      var url = "/api/page/" + pageId;
      return $http.put(url, page)
       .then(function (response) {
         return response.data;
       })
    }

    function deletePage(pageId) {


      pages = pages.filter(function (el) { return parseInt(el._id) !== parseInt(pageId);})
      console.log(pages);
    }

  }

})();
