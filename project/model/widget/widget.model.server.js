var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('YWidgetModel', widgetSchema);

var userSchema = require('../../../shared/model/models/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
// var userModel = require('../../../shared/model/models/user.model.server');

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
  return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
  return widgetModel.findByIdAndRemove({'_id': widgetId});
}

function deleteWidgetsByUserId(userId) {
  return widgetModel.remove({'_user': userId});
}
