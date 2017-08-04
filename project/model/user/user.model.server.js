var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByInstagramId = findUserByInstagramId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWidgetToUser = addWidgetToUser;
userModel.deletePageInUser = deleteWidgetInUser;

module.exports = userModel;

// this is the most complex function
function createUser(user) {
  return userModel.create(user)
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
  return userModel.findOne({'_id': userId});
}

function findUserByUsername(username) {
  return userModel.findOne({'username': username});
}

function findUserByCredentials(username, password) {
  return userModel.findOne({'username': username, 'password': password});
}

function findUserByGoogleId(id) {
  return userModel.findOne({'google.id': id});
}

function findUserByInstagramId(id) {
  return userModel.findOne({'instagram.id': id});
}

function updateUser(userId, user) {
  return userModel.update({'_id': userId}, {$set: user});
}

function deleteUser(userId) {
  return widgetModel.deleteWidgetsByUserId(userId)
    .catch(function(err) {
      console.log("Could not delete widgets associated with user.", err);
      return err;
    })
    .then(function () {
      return userModel.remove({'_id': userId});
    })
    .catch(function (err) {
      console.log("Could not delete user", err);
      return err;
    });
}

function addWidgetToUser(userId, widgetId, pageLocation) {
  return userModel.findById({_id: userId})
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
  return userModel.findById({_id: userId})
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

