var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

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
  return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
  return widgetModel.findByIdAndRemove({'_id': widgetId});
}

function reorderWidget(pageId, start, end) {
  // find all the widgets for the pageId
  //
}