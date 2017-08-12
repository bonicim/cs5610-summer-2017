var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('YWidgetModel', widgetSchema);
var userSchema = require('../../../shared/model/models/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

// declares and initializes all api's
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForUser = findAllWidgetsForUser;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.deleteWidgetsByUserId = deleteWidgetsByUserId;
widgetModel.findAllWidgetsForConditions = findAllWidgetsForConditions;
widgetModel.updateWidgetByUserByType = updateWidgetByUserByType;


// allows api's to be exported to some service layer
module.exports = widgetModel;

function updateWidgetByUserByType(userId, widget, type) {
  return widgetModel.findOneAndUpdate({_user:userId,widgetType:type},{$set: widget});
}

function createWidget(userId, widget) {
  widget._user = userId;
  return widgetModel.create(widget)
    .then(
      function (widget) {
        userModel.addWidgetToUser(userId, widget._id, widget.pageLocation);
        return widget;
      }
    )
    .catch(
      function (err) {
        console.log("Failed to create or widget to user.", err);
        return null;
      }
    );
}

function findAllWidgetsForUser(userId) {
  return widgetModel.find({_user: userId});
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return widgetModel.findByIdAndUpdate(widgetId, {$set: widget});
}

function deleteWidget(widgetId) {
  return widgetModel.findByIdAndRemove(widgetId);
}

function deleteWidgetsByUserId(userId) {
  return widgetModel.remove({'_user': userId});
}

function findAllWidgetsForConditions(userId, pageLocation) {
  return widgetModel.find({_user: userId, pageLocation: pageLocation});
}
