var mongoose = require('mongoose');

var pageObject = {
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel"},
  widgets: [{
    type: mongoose.Schema.ObjectId,
    ref: "WidgetModel"}],
  isPrivate: {
    type: Boolean,
    default: true},
  myDates: [{
    type: mongoose.Schema.ObjectId,
    ref: "UserModel"}],
  myMatches: [{
    type: mongoose.Schema.ObjectId,
    ref: "UserModel"}],
  aboutMe: String,
  idealDate: String,
  offer: String,
  myRating: [{
    type: mongoose.Schema.ObjectId,
    ref: "WidgetModel"}],
  dateCreated: {
    type: Date,
    default: Date.now}
};

var collectionParam = {
  collection: "pages"
};

var pageSchema = mongoose.Schema(pageObject, collectionParam);
module.exports = pageSchema;