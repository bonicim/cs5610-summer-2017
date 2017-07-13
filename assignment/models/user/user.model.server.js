// tool that helps us interact with MongoDb
var mongoose = require('mongoose');
// MongoDb schema
var userSchema = require('./user.schema.server');
// Mongoose instance
var userModel = mongoose.model('UserModel', userSchema);

// declares and initializes all api's
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

// allows api's to be exported to some service layer
module.exports = userModel;

function createUser(user) {
  return userModel.create(user);
}

function findUserById(userId) {
  return userModel.findOne({_id: userId});
}

function findUserByUsername(username) {
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
  return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
  return userModel.remove({_id: userId});
}