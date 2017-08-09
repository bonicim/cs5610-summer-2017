var app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../../public/project/uploads'});

app.post("/yapi/user/:userId/widget", createWidget);
app.get("/yapi/user/:userId/widget", findAllWidgetsForUser);
app.get("/yapi/widget/:widgetId", findWidgetById);
app.put("/yapi/widget/:widgetId", updateWidget);
app.delete("/yapi/widget/:widgetId", deleteWidget);
app.post("/yapi/upload", upload.single('myFile'), uploadImage);

app.post("/yapi/widget/widgetId/cond", findAllWidgetsForUserIdAndConditions);


// Implementations of event handlers

function createWidget(req, res) {
  var userId = req.params.userId;
  var widget = req.body;
  widgetModel
    .createWidget(userId, widget)
    .then(
      function (widget) {
        callback(widget, res)
      }
    )
    .catch(
      function (err) {
        handleError(err, res);
      }
    );
}

function findAllWidgetsForUser(req, res) {
  var userId = req.params.userId;
  widgetModel
    .findAllWidgetsForUser(userId)
    .then(function (widgets) {
        callback(widgets, res)
      }
    )
    .catch(function (err) {
        handleError(err, res);
      }
    );
}

function findWidgetById(req, res) {
  var widgetId = req.params.widgetId;
  widgetModel
    .findWidgetById(widgetId)
    .then(
      function (widget) {
        callback(widget, res);
      }
    )
    .catch(
      function (err) {
        handleError(err, res);
      }
    );
}

function updateWidget(req, res) {
  var widgetId = req.params.widgetId;
  var widget = req.body;
  widgetModel
    .updateWidget(widgetId, widget)
    .then(
      function (widget) {
        callback(widget, res);
      }
    )
    .catch(
      function (err) {
        handleError(err, res);
      }
    );
}

function deleteWidget(req, res) {
  var widgetId = req.params.widgetId;
  widgetModel
    .deleteWidget(widgetId)
    .then(
      function (widget) {
        callback(widget, res);
      }
    )
    .catch(
      function (err) {
        handleError(err, res);
      }
    );
}

//TODO: need to fix when doing front end
function uploadImage(req, res) {
  var widgetId      = req.body.widgetId;
  var width         = req.body.width;
  var myFile        = req.file;
  var userId        = req.body.userId;
  var websiteId     = req.body.websiteId;
  var pageId        = req.body.pageId;

  var uploadDetails = {
    originalname: myFile.originalname, // file name on user's computer
    filename:       myFile.filename,     // new file name in upload folder
    path:           myFile.path,         // full path of uploaded file
    destination:    myFile.destination,  // folder where file is saved to
    size:           myFile.size,
    mimetype:       myFile.mimetype
  };

  // updates the url for the given widget
  widgetModel
    .findWidgetById(widgetId)
    .then(
      // the returned object is not a JSON.
      function (widget) {
        if (widget) {
          var callbackUrl =
            "/public/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
          updateUrlWidget(widget, res, uploadDetails.filename, callbackUrl);
        }
        else {
          res.sendStatus(400).send("Bad input. Widget could not be found.");
        }
      }
    )
    .catch(function (err) {
      handleError(err, res);
    });
}

function updateUrlWidget(widget, res, filename, callbackUrl) {
  widget[0].url = '/public/assignment/uploads/' + filename;
  widgetModel
    .updateWidget(widget[0].id, widget[0])
    .then(
      function (newWidget) {
        //callback(newWidget, res);
        if (newWidget) {
          console.log("New widget is: " + JSON.stringify(newWidget));
          res.redirect(callbackUrl);
        } else {
          res.sendStatus(400).send("Bad input. Widget could not be found and updated.");
        }
      }
    )
    .catch(function (err) {
      handleError(err, res);
    })
}

function findAllWidgetsForUserIdAndConditions(req, res) {
  var cond = req.body;
  var userId = cond.uid;
  console.log("server uid: ", userId);
  var pageLocation = cond.pageLocation;
  widgetModel
    .findAllWidgetsForConditions(userId, pageLocation)
    .then(
      function (data) {
        if (data) {
          console.log("The array of all widgets for conditions is: ", data);
          res.json(data);
        } else {
          res.sendStatus(400);
        }
      }
    )
    .catch(function (err) {
      handleError(err, res);
    })



}


function handleError(err, res) {
  console.log("Call to database failed.", err);
  res.send(err);
}

function callback(obj, res) {
  if (obj) {
    console.log("The widget object is: ", obj)
    res.json(obj);
  } else {
    res.sendStatus(400);
  }
}
