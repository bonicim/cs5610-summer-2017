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

// allows api's to be exported to some service layer
module.exports = widgetModel;
