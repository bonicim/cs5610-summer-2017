var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPageToUser = addWebsiteToUser;
userModel.deletePageInUser = deleteWebsiteInUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByInstagramId = findUserByGoogleId;

module.exports = userModel;