(function () {
  angular
    .module("Yobai")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    var api = {

      "findWidgetById": findWidgetById,
      "findWidgetsByIdAndPageLocation": findWidgetsByIdAndPageLocation
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

    function findWidgetsByIdAndPageLocation(uid, pageLocation) {
      // ToDO create the
      var url = "/yapi/widget/widgetId/cond";
      var cond = {uid: uid, pageLocation: pageLocation};
      return $http.post(url, cond)
        .then(
          function (response) {
            return response.data;
          }
        )
    }





  }


}) ();
