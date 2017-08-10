var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var widgetSchema = require('../../../project/model/widget/widget.schema.server');
var widgetModel = mongoose.model('YWidgetModel', widgetSchema);

// declares and initializes all api's
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUsersEligible = findUsersEligible;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWidgetToUser = addWidgetToUser;
userModel.addWebsiteToUser = addWebsiteToUser;
userModel.deleteWebsiteInUser = deleteWebsiteInUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;

// allows api's to be exported to some service layer
module.exports = userModel;

function createUser(user) {
  return userModel.create(user)
    .then(function (createdUser) {
      var userId = createdUser._id;
      var profileImageWidget = {};
      profileImageWidget.pageLocation = "COMMON";
      profileImageWidget.widgetType = "IMAGE";
      profileImageWidget.name = "Profile photo";
      profileImageWidget.width = 42;
      if (createdUser.isSuitor) {
        profileImageWidget.url = "http://img.usmagazine.com/article-leads-vertical-300/1250530894_brad_pitt_290x402.jpg";
      } else {
        profileImageWidget.url = "http://i.huffpost.com/gen/3022856/thumbs/o-KARLIE-570.jpg";
      }
      return widgetModel.createWidget(userId, profileImageWidget)
        .then(function () {
          // mark all widgets as public
          if(createdUser.isSuitor) {
            var ratingWidget = {};
            ratingWidget.pageLocation = "PUBLIC";
            ratingWidget.widgetType = "IDEALDATE";
            ratingWidget.text = "Dinner and a movie.";
            ratingWidget.name = "My ideal date";
            return widgetModel.createWidget(userId, ratingWidget);
          } else {
            var youTubeWidget = {};
            youTubeWidget.pageLocation = "PUBLIC";
            youTubeWidget.widgetType = "YOUTUBE";
            youTubeWidget.name = "My youtube clip";
            return widgetModel.createWidget(userId, youTubeWidget)
              .then(function () {
                var publicImageWidget = {};
                publicImageWidget.pageLocation = "PUBLIC";
                publicImageWidget.widgetType = "IMAGE";
                publicImageWidget.url =  "https://pbs.twimg.com/profile_images/847068073773465600/YXimkxF4.jpg";
                publicImageWidget.name = "My secondary photo";
                publicImageWidget.width = 42;
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

function addWebsiteToUser(userId, websiteId) {
  return userModel.findById({_id: userId})
    .then(function (user) {
      user.websites.push(websiteId);
      return user.save();
    })
    .catch(function (err) {
      console.log("Could not get user to add website inside: ", err)
      return null;
    })
}

function deleteWebsiteInUser(websiteId, userId) {
  return userModel.findById({_id: userId})
    .then(function (user) {
      user.websites.pull(websiteId);
      return user.save();
    })
}

function findUserById(userId) {
  return userModel.findOne({'_id': userId});
}

function findUserByUsername(username) {
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return userModel.findOne({'username': username, 'password': password});
}

function findUsersEligible() {
  return userModel.find({'isSuitor': true});
}

function updateUser(userId, user) {
  return userModel.update({'_id': userId}, {$set: user});
}

// this is the inverse of create user
function deleteUser(userId) {
  return userModel.remove({'_id': userId})
    .then(function () {
      return widgetModel.deleteWidgetsByUserId(userId)
    });
}

function findUserByGoogleId(id) {
  return userModel.findOne({'google.id': id});
}

function findUserByFacebookId(id) {
  return userModel.findOne({'facebook.id': id});
}