var mongoose = require('mongoose');

var widgetObject = {
  _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
  pageLocation: {
    type: String,
    uppercase: true,
    enum: ['PRIVATE', 'PUBLIC', 'COMMON']},
  widgetType: {
    type: String,
    uppercase: true,
    enum: ['RATING', 'IMAGE', 'YOUTUBE', 'ABOUTME', "IDEALDATE", "PROFPHOTO"]},
  name: {
    type: String,
    default: ""},
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: {
    type: Number
  },
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: {
    type: Boolean,
    default: true},
  dateCreated: {
    type: Date,
    default: Date.now}
};

var collectionParam = {
  collection: "ywidget"
};

var widgetSchema = mongoose.Schema(widgetObject, collectionParam);
module.exports = widgetSchema;
