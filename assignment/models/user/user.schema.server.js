var mongoose = require('mongoose');

var userObject = {
  username: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
  dateCreated: {type: Date, default: Date.now},
  google: {
    id: String,
    token: String
  }
};

var collectionParam = {
  collection: "user"
};

var userSchema = mongoose.Schema(userObject, collectionParam);
module.exports = userSchema;
