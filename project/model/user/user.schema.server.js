var mongoose = require('mongoose');

var userObject = {
  username: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  viber: String,
  line: String,
  branch: String,
  rank: String,
  pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],
  dateCreated: {type: Date, default: Date.now},
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
  collection: "users"
};

var userSchema = mongoose.Schema(userObject, collectionParam);
module.exports = userSchema;
