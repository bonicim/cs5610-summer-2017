var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageSchema = require('../page/page.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = mongoose.model('PageModel', pageSchema);

// declares and initializes all api's
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

// allows api's to be exported to some service layer
module.exports = widgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return widgetModel.create(widget)
    .then(
      function (widget) {
        pageModel.insertWidget(pageId, widget._id);
        return widget;
      }
    )
    .catch(
      function (err) {
        console.log("Failed to create widget", err);
        return null;
      }
    );
}

function findAllWidgetsForPage(pageId) {
  return pageModel
    .findAllWidgetsByPageId(pageId);
}

function findWidgetById(widgetId) {
  return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
  return widgetModel
    .findByIdAndRemove({'_id': widgetId})
    .then(
      function (widget) {
        pageModel.deleteWidget(pageId, widgetId)
        return widget;
      }
    )
    .catch(
      function (err) {
        console.log("Error in deleting widget", err);
        return null;
      }
    );
}

function reorderWidget(pageId, start, end) {
  // assumption: order displayed on the website corresponds to the order
  // of the widget array in the page
  return pageModel
    .reorderWidgetArrByPage(pageId, start, end);
}

