(function () {
  angular
    .module("WebAppMaker")
    .factory("WidgetService", WidgetService);

  function WidgetService($http) {
    // api interface object
    var api = {
      "createWidget" : createWidget,
      "findWidgetsByPageId" : findWidgetsByPageId,
      "findWidgetsById" : findWidgetsById,
      "updateWidget" : updateWidget,
      "deleteWidget" : deleteWidget
    };
    return api;

    /**
     * Creates widget
     * @param pageId
     * @param widget
     * @returns {*}
     */
    function createWidget(pageId, widgetType) {
      var widgetToAdd = {"widgetType": widgetType};
      console.log(widgetToAdd);
      var url = "/api/page/" + pageId + "/widget";
      return $http.post(url, widgetToAdd)
        .then(function (response) {
          return response.data;
        });
    }

    /**
     *
     * @param pageId
     * @returns {*}
     */
    function findWidgetsByPageId(pageId) {
      var url = "/api/page/" + pageId + "/widget";
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
    }

    /**
     *
     * @param widgetId
     * @returns {*}
     */
    function findWidgetsById(widgetId) {
      var key;
      for (key in widgets) {
        var widgetActual = widgets[key];
        if (parseInt(widgetActual._id) === parseInt(widgetId)) {
          return widgetActual;
        }
      }
      return null;
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

    /**
     *
     * @param widgetId
     * @returns {*}
     */
    function deleteWidget(widgetId) {
      var url ="/api/widget/" + widgetId;
      return $http.delete(url)
        .then(function (response) {
          return response.data;
        });
    }
  }
})();
