(function () {
  angular
    .module("WebAppMaker")
    .factory("WidgetService", WidgetService);

  function WidgetService() {
    // temporary database
    var widgets = [
      { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
      { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
      { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
      { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
      { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]


    // api interface object
    var api = {
      "createWidget" : createWidget,
      "findWidgetsByPageId" : findWidgetsByPageId,
      "findWidgetsById" : findWidgetsById,
      "updateWidget" : updateWidget,
      "deleteWidget" : deleteWidget
    };

    return api;

    function createWidget(pageId, widget) {

    }

    function findWidgetsByPageId(pageId) {
      var key;
      var widgetsArr = [];
      for (key in widgets) {
        var widgetActual = widgets[key];
        if (parseInt(widgetActual.pageId) === parseInt(pageId)) {
          widgetsArr.push(widgetActual);
        }
      }
      return widgetsArr;
    }

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

    function updateWidget(widgetId, widget) {
      deleteWidget(widgetId);
      widgets.push(widget);
      console.log(widgets);
    }

    function deleteWidget(widgetId) {
      widgets = widgets.filter(function (el) {return parseInt(el._id) !== parseInt(widgetId);});
      console.log(widgets);
    }

  }

})();
