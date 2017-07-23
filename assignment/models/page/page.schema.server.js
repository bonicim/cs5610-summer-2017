var mongoose = require('mongoose');

var pageObject = {
  _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
  name: String,
  title: String,
  description: String,
  widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
  dateCreated: {type: Date, default: Date.now}
};

var collectionParam = {
  collection: "page"
};

var pageSchema = mongoose.Schema(pageObject, collectionParam);
module.exports = pageSchema;
