var app = require('../../express');

// temporary database
var pages = [{ "_id": "321", "name": "Post 1", "wid": "456", "description": "Lorem" },
  { "_id": "432", "name": "Post 2", "wid": "456", "description": "Lorem" },
  { "_id": "543", "name": "Post 3", "wid": "456", "description": "Lorem" }];

// POST

// GET

// PUT
// URL = '/page/:pageId/widget?initial=index1&final=index2
// pageId: id of page whose widgets are being displayed
// initial: initial index of the widget being being reordered
// final: final index of widget after being reordered
app.put('/page/:pageId/widget', sortWidgets);


// DELETE

// Implementations of event handlers
// this will be called by the widget client service to be able to sort the widgets
function sortWidgets() {

}