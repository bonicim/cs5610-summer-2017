(function () {
  angular
    .module("WebAppMaker")
    .factory("PageService", PageService);

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
      };
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

    /**
     * Updates the page and returns the page
     * @param pageId
     * @param name
     * @param description
     * @returns {*}
     */
    function updatePage(pageId, name, description) {
      var page = {
          "name": name,
          "description": description
        };
      var url = "/api/page/" + pageId;
      return $http.put(url, page)
       .then(function (response) {
         return response.data;
       })
    }


    /**
     * Deletes the page from the website
     * @param pageId
     * @returns {*}
     */
    function deletePage(pageId) {
      var url = "/api/page/" + pageId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        })
    }

  }

})();
