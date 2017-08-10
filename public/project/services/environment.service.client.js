(function () {
  angular
    .module("Yobai")
    .factory("EnvService", EnvService);

  function EnvService($http) {
    var api = {
      "getOmdbKey": getOmdbKey
    };
    return api;

    function getOmdbKey() {
      var url = "/yenv/omdb";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }
  }

}) ();
