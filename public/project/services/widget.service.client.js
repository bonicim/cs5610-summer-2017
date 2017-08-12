(function () {
  angular
    .module("Yobai")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    var api = {

      "findWidgetById": findWidgetById,
      "findWidgetsByIdAndPageLocation": findWidgetsByIdAndPageLocation,
      "updateWidgetByUserByType": updateWidgetByUserByType
    };
    return api;

    function updateWidgetByUserByType(widget, uid, type) {
      var url = "/yapi/widget/profile/" + uid;
      var data = {widget: widget, type: type};
      console.log("TYPE:", type);
      return $http.put(url, data)
        .then(
          function (response) {
            return response.data;
          }
        );
    }

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
