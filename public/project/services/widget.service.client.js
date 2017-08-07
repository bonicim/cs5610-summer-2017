(function () {
  angular
    .module("Yobai")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    var api = {

      "findWidgetById" : findWidgetById
    };
    return api;

    function findWidgetById(widgetId) {
      var url = "/yapi/widget/" + widgetId;
      return $http.get(url)
        .then(
          function (response) {
            return response.data;
          }
        )
    }





  }


}) ();
