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
app.post("/api/upload", upload.single('myFile'), uploadImage);

// GET

// PUT

app.put('', sortWidgets);

// DELETE

// Implementations of event handlers

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

  var widget = getWidgetById(widgetId);
  widget.url = '/assignment/uploads/'+filename;

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
  // TODO: should throw some error msg; this is bad practice; never return null
  return null;
}

function findWidgetById(req, res) {

}