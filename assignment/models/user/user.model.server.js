var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

// declares and initializes all api's
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsiteToUser = addWebsiteToUser;
userModel.deleteWebsiteInUser = deleteWebsiteInUser;
userModel.findUserByGoogleId = findUserByGoogleId;

// allows api's to be exported to some service layer
module.exports = userModel;

function deleteWebsiteInUser(websiteId, userId) {
  return userModel.findById({_id: userId})
    .then(function (user) {
      user.websites.pull(websiteId);
      return user.save();
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

function createUser(user) {
  return userModel.create(user);
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

function updateUser(userId, user) {
  return userModel.update({'_id': userId}, {$set: user});
}

function deleteUser(userId) {
  return userModel.remove({'_id': userId});
}

function findUserByGoogleId(id) {
  return userModel.findOne({'google.id': id});
}