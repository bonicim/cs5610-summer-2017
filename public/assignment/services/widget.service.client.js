(function () {
  angular
    .module("WebAppMaker")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    // api interface object
    var api = {
      "createWidget" : createWidget,
      "findWidgetsByPageId" : findWidgetsByPageId,
      "findWidgetById" : findWidgetById,
      "updateWidget" : updateWidget,
      "deleteWidget" : deleteWidget,
      "sortWidgets" : sortWidgets
    };
    return api;

    function sortWidgets(start, end, pageId) {
      var url = "/page/" + pageId + "/widget?initial=index1&final=index2";
      url = url
         .replace("index1", start)
         .replace("index2", end);
      console.log("The new url is: " + url);
      return $http.put(url)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     * Creates widget
     * @param pageId
     * @param widget
     * @returns {*}
     */
    function createWidget(pageId, widgetType) {
      var widgetToAdd = {"widgetType": widgetType.toUpperCase()};
      console.log(widgetToAdd);
      var url = "/api/page/" + pageId + "/widget";
      return $http.post(url, widgetToAdd)
        .then(function (response) {
          return response.data;
        });
    }

    // client expects an array of actual widgets not just widget references
    // the array must be in the order according to pageId's array order
    function findWidgetsByPageId(pageId) {
      var url = "/api/page/" + pageId + "/widget";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     *
     * @param widgetId
     * @returns {*}
     */
    function findWidgetById(widgetId) {
      var url = "/api/widget/" + widgetId;
      return $http.get(url)
        .then(
          function (response) {
            return response.data;
          }
        )
    }

    /**
     *
     * @param widgetId
     * @param widget
     * @returns {*}
     */
    function updateWidget(widgetId, widget) {
      var url ="/api/widget/" + widgetId;
      return $http.put(url, widget)
        .then(function (response) {
          return response.data;
        });
    }

    function deleteWidget(pageId, widgetId) {
      var url ="/api/widget/" + widgetId + "?pageId=" +pageId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        });
    }
  }
})();
