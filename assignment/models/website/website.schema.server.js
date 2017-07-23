var mongoose = require('mongoose');

var websiteObject = {
  _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
  name: String,
  description: String,
  pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],
  dateCreated: {type: Date, default: Date.now}
};

var collectionParam = {
  collection: "website"
};

var websiteSchema = mongoose.Schema(websiteObject, collectionParam);
module.exports = websiteSchema;
