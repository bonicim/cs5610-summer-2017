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

}

function findAllWidgetsForPage(pageId) {

}

function findWidgetById(widgetId) {

}

function updateWidget(widgetId, widget) {

}

function deleteWidget(widgetId) {

}

function reorderWidget(pageId, start, end) {

}