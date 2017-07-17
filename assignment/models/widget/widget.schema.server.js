var mongoose = require('mongoose');

var widgetObject = {
  _page: {type: mongoose.Schema.ObjectId, ref: "PageModel"},
  widgetType: {
    type: String,
    uppercase: true,
    enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
  name: String,
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
  formatted: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now}
};

var collectionParam = {
  collection: "widget"
};

var widgetSchema = mongoose.Schema(widgetObject, collectionParam);
module.exports = widgetSchema;
