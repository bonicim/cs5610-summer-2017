var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

// declares and initializes all api's
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForUser = findAllWidgetsForUser;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.deleteWidgetsByUserId = deleteWidgetsByUserId;

// allows api's to be exported to some service layer
module.exports = widgetModel;

function createWidget(userId, widget) {

}
