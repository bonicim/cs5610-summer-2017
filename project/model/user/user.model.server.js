var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPageToUser = addPageToUser;
userModel.deletePageInUser = deletePageInUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByInstagramId = findUserByInstagramId;

module.exports = userModel;

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

function addPageToUser(userId, pageId) {
  return userModel.findById({_id: userId})
    .then(function (user) {
      user.pages.push(pageId);
      return user.save();
    })
    .catch(function (err) {
      console.log("Could not get user to add page inside: ", err)
      return null;
    })
}

function deletePageInUser(pageId, userId) {
  return userModel.findById({_id: userId})
    .then(function (user) {
      user.pages.pull(pageId);
      return user.save();
    })
}

function findUserByGoogleId(id) {
  return userModel.findOne({'google.id': id});
}

function findUserByInstagramId(id) {
  return userModel.findOne({'instagram.id': id});
}
