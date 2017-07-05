var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/assignment/uploads' });

var widgets = [
  { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
  { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
  { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://youtu.be/AM2Ivdi9c4E" },
  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
]

// POST
app.post("/api/page/:pageId/widget", createWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);

// GET
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);

// PUT
app.put("/api/widget/:widgetId", updateWidget);
app.put('', sortWidgets);

// DELETE
app.delete("/api/widget/:widgetId", deleteWidget);


// Implementations of event handlers

function createWidget(req, res) {
  var id = generateId();
  var widgetToAdd = {
    '_id' : id,
    'widgetType': req.body.widgetType,
    'pageId' : req.params.pageId
  };

  if (widgetToAdd.widgetType === "HEADING") {
    widgetToAdd['size'] = undefined;
    widgetToAdd['text'] = undefined;
  }
  else if (widgetToAdd.widgetType === "IMAGE") {
    widgetToAdd['width'] = undefined;
    widgetToAdd['url'] = undefined;

  }
  else if (widgetToAdd.widgetType === "YOUTUBE") {
    widgetToAdd['width'] = undefined;
    widgetToAdd['url'] = undefined;
  }

  widgets.push(widgetToAdd);
  return res.json(widgetToAdd);
}

function generateId() {
  function getMaxId(maxId, widget) {
    var currId = parseInt(widget._id);
    if (maxId > currId) {
      return maxId;
    }
    else {
      return currId + 1;
    }
  }
  var uniqueId = widgets.reduce(getMaxId, 0).toString();
  console.log("We generated a unique id. It is: " + uniqueId);
  return uniqueId;
}

function findAllWidgetsForPage(req, res) {
  var widgetsArr = [];
  for (key in widgets) {
    var widgetActual = widgets[key];
    if (parseInt(widgetActual.pageId) === parseInt(req.params.pageId)) {
      widgetsArr.push(widgetActual);
    }
  }
  return res.json(widgetsArr);
}

function findWidgetById(req, res) {
  for (key in widgets) {
    var widgetActual = widgets[key];
    if (parseInt(widgetActual._id) === parseInt(req.params.widgetId)) {
      return res.json(widgetActual);
    }
  }
  return res.sendStatus(404);
}

function updateWidget(req, res) {
  for (key in widgets) {
    var widgetActual = widgets[key];
    if (parseInt(widgetActual._id) === parseInt(req.params.widgetId)) {
      widgets[key] = req.body;
      return res.json(widgets[key]);
    }
  }
  return res.sendStatus(404);
}

function deleteWidget(req, res) {
  for (key in widgets) {
    var widgetActual = widgets[key];
    if (parseInt(widgetActual._id) === parseInt(req.params.widgetId)) {
      widgets.splice(key,1);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(404);
}

// TODO: implement this
// grab the params and query
function sortWidgets(req, res) {

}

function sortItem(start, end) {

}

function uploadImage(req, res) {
  var widgetId      = req.body.widgetId;
  var width         = req.body.width;
  var myFile        = req.file;

  var userId = req.body.userId;
  var websiteId = req.body.websiteId;
  var pageId = req.body.pageId;

  var originalname  = myFile.originalname; // file name on user's computer
  var filename      = myFile.filename;     // new file name in upload folder
  var path          = myFile.path;         // full path of uploaded file
  var destination   = myFile.destination;  // folder where file is saved to
  var size          = myFile.size;
  var mimetype      = myFile.mimetype;

  // updates the url for the given widget
  var widget = getWidgetById(widgetId);
  if (widget === null) {
    return res.sendStatus(500);
  }
  widget.url = '/public/assignment/uploads/' + filename;

  // brings us back to the submission form
  var callbackUrl =
    "/public/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
  res.redirect(callbackUrl);
}

// gets some widget from an array of widgets based on wgid
function getWidgetById(wgid) {
  for (key in widgets) {
    var widgetActual = widgets[key];
    if(parseInt(widgetActual._id) === parseInt(wgid)) {
      return widgetActual;
    }
  }
  return null;
}

