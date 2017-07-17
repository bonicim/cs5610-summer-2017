var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/assignment/uploads' });

app.post("/api/page/:pageId/widget", createWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
// app.put('/page/:pageId/widget?initial=index1&final=index2, sortWidgets)
app.put("/page/:pageId/widget", sortWidgets);
app.delete("/api/widget/:widgetId", deleteWidget);

// Implementations of event handlers

function createWidget(req, res) {
  var pageId = req.params.pageId;
  var widget = req.body;
  widgetModel
    .createWidget(pageId, widget)
    .then(
      function (err, widget) {
        callback(err, widget, res)
      }
    );
}

function callback(err, obj, res) {
  if (err) {
    res.send(err);
  }
  if (obj) {
    res.json(obj);
  } else {
    res.sendStatus(400).send("Bad input. Page not created.");
  }
}

function findAllWidgetsForPage(req, res) {
  var pageId = req.params.pageId;
  widgetModel
    .findAllWidgetsForPage(pageId)
    .then(
      function (err, widgets) {
        callback(err, widgets, res)
      }
    );
}

function findWidgetById(req, res) {
  var widgetId = req.params.widgetId;
  widgetModel
    .findWidgetById(widgetId)
    .then(
      function (err, widget) {
        callback(err, widget, res);
      }
    );
}

function updateWidget(req, res) {
  var widgetId = req.params.widgetId;
  var widget = req.body;
  widgetModel
    .updateWidget(widgetId, widget)
    .then(
      function (err, widget) {
        callback(err, widget, res);
      }
    );
}

function deleteWidget(req, res) {
  var widgetId = req.params.widgetId;
  widgetModel
    .deleteWidget(widgetId)
    .then(
      function (err, widget) {
        callback(err, widget, res);
      }
    );
}

function sortWidgets(req, res) {
  console.log("pageId is: " + req.params.pageId);
  console.log("start is: " + req.query.initial);
  console.log("end is: " + req.query.final);
  var pageId = req.params.pageId;
  var start = req.query.initial;
  var end = req.query.final;

  // get all the widgets by pageid
  var widgetsArr = [];
  for (key in widgets) {
    var widgetActual = widgets[key];
    if (parseInt(widgetActual.pageId) === parseInt(pageId)) {
      widgetsArr.push(widgetActual);
    }
  }

  // delete all the widgets by pageId in widgets array
  // updates the widgets array
  console.log("The beginning widget array is: " + widgets);
  widgets = widgets.filter(function (el) {return el.pageId !== pageId;});
  console.log("The filtered widget array is: " + widgets);

  // reorder the targeted widgets that must be sorted
  var widgetToBeMoved = widgetsArr.splice(start, 1)[0];
  widgetsArr.splice(end, 0, widgetToBeMoved);
  console.log("The reorderd widgets are: " + widgetsArr);

  // add the widgets back in the widgets array
  for (key in widgetsArr) {
    widgets.push(widgetsArr[key]);
  }
  console.log("The newly sorted widget array is: " + widgets);
  return res.sendStatus(200);
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

