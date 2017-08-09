var mongoose = require('mongoose');

var userObject = {
  username: {
    type: String,
    unique: true},
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  viber: String,
  line: String,
  isSuitor: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  branch: String,
  rank: String,
  page: {
    private: {
      matches: [{
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
      }],
      mates: [{
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
      }],
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    },
    public: {
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    },
    common: {
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    }
  },
  dateCreated: {
    type: Date,
    default: Date.now},
  google: {
    id: String,
    token: String
  },
  instagram: {
    id: String,
    token: String
  }
};
var collectionParam = {
  collection: "yuser"
};

var userSchema = mongoose.Schema(userObject, collectionParam);
module.exports = userSchema;
