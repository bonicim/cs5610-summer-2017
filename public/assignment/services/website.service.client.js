(function () {
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);

  function WebsiteService($http) {
    // api interface object
    var api = {
      "createWebsite" : createWebsite,
      "findWebsitesByUser" : findWebsitesByUser,
      "findWebsiteById" : findWebsiteById,
      "updateWebsite" : updateWebsite,
      "deleteWebsite" : deleteWebsite
    };
    return api;

    /**
     * Returns the newly created website
     * @param userId
     * @param website
     */
    function createWebsite(userId, website) {
      var url ="/api/user/" + userId + "/website";
      return $http.post(url, website)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Returns a list of websites owned by the given userId
     * @param userId
     * @returns a list of websites
     */
    function findWebsitesByUser(userId) {
      var url ="/api/user/" + userId + "/website";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    function findWebsiteById(websiteId) {
    }

    /**
     * Updates the website with the given website
     * @param websiteId
     * @param website
     * @returns http status
     */
    function updateWebsite(websiteId, website) {
      var url = "/api/website/" + websiteId;
      return $http.put(url, website)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Deletes the website
     * @param websiteId
     */
    function deleteWebsite(websiteId) {
      var url = "/api/website/" + websiteId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        });
    }
  }

})();
