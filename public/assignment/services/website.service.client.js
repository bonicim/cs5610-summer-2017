(function () {
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);

  function WebsiteService($http) {
    // temporary database
    var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
      { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
      { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
      { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
      { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
      { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
      { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];


    // api interface object
    var api = {
      "createWebsite" : createWebsite,
      "findWebsitesByUser" : findWebsitesByUser,
      "findWebsiteById" : findWebsiteById,
      "updateWebsite" : updateWebsite,
      "deleteWebsite" : deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
      var id = generateId();
      var websiteToAdd = {_id : id, name : website.name, developerId : userId, description : website.description};
      websites.push(websiteToAdd);
    }

    function generateId() {
      function getMaxId(maxId, website) {
        var currId = parseInt(website._id);
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
      var uniqueId = websites.reduce(getMaxId, 0).toString();
      console.log("We generated a unique id. It is: " + uniqueId);
      return uniqueId;
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
      var key;
      for (key in websites) {
        var websiteActual = websites[key];
        if (parseInt(websiteActual._id) === parseInt(websiteId)) {
          return websiteActual;
        }
      }
      return null;
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
