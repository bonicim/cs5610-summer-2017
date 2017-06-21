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
      console.log("entered crateWidget");
      var id = generateId();
      console.log("id successfully generated");
      var widgetToAdd = {_id : id, widgetType: widget.widgetType, pageId : pageId};
      console.log(widgetToAdd._id + " NEW ID is now part of new widget");
      if (widgetToAdd.widgetType === "HEADING") {
       widgetToAdd['size'] = undefined;
       widgetToAdd['text'] = undefined;
      }
      else if (widgetToAdd.widgetType === "IMAGE") {
        widgetToAdd['width'] = undefined;
        widgetToAdd['url'] = undefined;

      }
      else if (widgetToAdd.widgetType === "YOUTUBE") {
        widgetToAdd['width'] = undefined;
        widgetToAdd['url'] = undefined;
      }
      widgets.push(widgetToAdd);
      return widgetToAdd;
    }

    function generateId() {
      function getMaxId(maxId, widget) {
        var currId = parseInt(widget._id);
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
      var uniqueId = widgets.reduce(getMaxId, 0).toString();
      console.log("We generated a unique id. It is: " + uniqueId);
      return uniqueId;
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
