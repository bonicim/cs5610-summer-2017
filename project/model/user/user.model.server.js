var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var yuserModel = mongoose.model('YUserModel', userSchema);
var widgetSchema = require('../widget/widget.schema.server');
var widgetModel = mongoose.model('YWidgetModel', widgetSchema);

yuserModel.createUser = createUser;
yuserModel.findUserById = findUserById;
yuserModel.findUserByUsername = findUserByUsername;
yuserModel.findUserByCredentials = findUserByCredentials;
yuserModel.findUserByGoogleId = findUserByGoogleId;
yuserModel.findUserByInstagramId = findUserByInstagramId;
yuserModel.updateUser = updateUser;
yuserModel.deleteUser = deleteUser;
yuserModel.addWidgetToUser = addWidgetToUser;
yuserModel.deletePageInUser = deleteWidgetInUser;

module.exports = yuserModel;

// this is the most complex function
function createUser(user) {
  return yuserModel.create(user)
    .then(function (createdUser) {
      var userId = createdUser._id;
      // mark widget as common
      var profileImageWidget = {};
      return widgetModel.createWidget(userId, profileImageWidget)
        .then(function () {
          // mark all widgets as public
          if(createdUser.isSuitor) {
            var ratingWidget = {};
            return widgetModel.createWidget(userId, ratingWidget);
          } else {
            var youTubeWidget = {};
            return widgetModel.createWidget(userId, youTubeWidget)
              .then(function () {
                var publicImageWidget = {};
                return widgetModel.createWidget(userId, publicImageWidget);
              })
          }
        })
    })
    .catch (function (err) {
      console.log("Failed to create user.", err);
      return err;
    });
}

function findUserById(userId) {
  return yuserModel.findOne({'_id': userId});
}

function findUserByUsername(username) {
  return yuserModel.findOne({'username': username});
}

function findUserByCredentials(username, password) {
  return yuserModel.findOne({'username': username, 'password': password});
}

function findUserByGoogleId(id) {
  return yuserModel.findOne({'google.id': id});
}

function findUserByInstagramId(id) {
  return yuserModel.findOne({'instagram.id': id});
}

function updateUser(userId, user) {
  return yuserModel.update({'_id': userId}, {$set: user});
}

function deleteUser(userId) {
  return widgetModel.deleteWidgetsByUserId(userId)
    .catch(function(err) {
      console.log("Could not delete widgets associated with user.", err);
      return err;
    })
    .then(function () {
      return yuserModel.remove({'_id': userId});
    })
    .catch(function (err) {
      console.log("Could not delete user", err);
      return err;
    });
}

function addWidgetToUser(userId, widgetId, pageLocation) {
  return yuserModel.findById({_id: userId})
    .then(function (user) {
      if (pageLocation === "COMMON") {
        user.page.common.widgets.push(widgetId);
      }
      else if (pageLocation === "PUBLIC"){
        user.page.public.widgets.push(widgetId);
      }
      else if (pageLocation === "PRIVATE") {
        user.page.private.widgets.push(widgetId);
      }
      return user.save();
    })
    .catch(function (err) {
      console.log("Could not add widget in user: ", err);
      return err;
    })
}

function deleteWidgetInUser(userId, widgetId, pageLocation) {
  return yuserModel.findById({_id: userId})
    .then(function (user) {
      if (pageLocation === "COMMON") {
        user.page.common.widgets.pull(widgetId);
      }
      else if (pageLocation === "PUBLIC"){
        user.page.public.widgets.pull(widgetId);
      }
      else if (pageLocation === "PRIVATE") {
        user.page.private.widgets.pull(widgetId);
      }
      return user.save();
    })
    .catch(function (err) {
      console.log("Could not delete widget in user: ", err);
      return err;
    })

}

