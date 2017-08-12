(function () {
  angular
    .module("Yobai")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    var api = {

      "findWidgetById": findWidgetById,
      "findWidgetsByIdAndPageLocation": findWidgetsByIdAndPageLocation,
      "updateYouTubeWidgetByUser": updateYouTubeWidgetByUser
    };
    return api;

    function updateYouTubeWidgetByUser(widget, uid) {
      var url = "/yapi/widget/youtube/" + uid;
      var data = {widget:widget};
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
