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
  aboutMe: {
    type: String,
    default: "Immma be me."},
  idealDate: {
    type: String,
    default: "Dinner and a movie."},
  offer: {
    type: Number,
    default: 42},
  dateCreated: {
    type: Date,
    default: Date.now}
};

var collectionParam = {
  collection: "pages"
};

var pageSchema = mongoose.Schema(pageObject, collectionParam);
module.exports = pageSchema;