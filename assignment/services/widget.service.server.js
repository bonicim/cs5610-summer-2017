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

function handleError(err, res) {
  console.log("Call to database failed.")
  res.send(err);
}

function callback(obj, res) {
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
      function (widgets) {
        callback(widgets, res)
      }
    )
    .catch(
      function (err) {
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

function sortWidgets(req, res) {
  console.log("pageId is: " + req.params.pageId);
  console.log("start is: " + req.query.initial);
  console.log("end is: " + req.query.final);
  var pageId = req.params.pageId;
  var start = req.query.initial;
  var end = req.query.final;

  widgetModel
    .reorderWidget(pageId,start,end)
    .then(
      function (widgets) {
        callback(widgets, res);
      }
    )
    .catch(
      function (err) {
        handleError(err, res);
      }
    )

  // //get all the widgets by pageid
  // var widgetsArr = [];
  // for (key in widgets) {
  //   var widgetActual = widgets[key];
  //   if (parseInt(widgetActual.pageId) === parseInt(pageId)) {
  //     widgetsArr.push(widgetActual);
  //   }
  // }
  //
  // // delete all the widgets by pageId in widgets array
  // // updates the widgets array
  // console.log("The beginning widget array is: " + widgets);
  // widgets = widgets.filter(function (el) {return el.pageId !== pageId;});
  // console.log("The filtered widget array is: " + widgets);
  //
  // // reorder the targeted widgets that must be sorted
  // var widgetToBeMoved = widgetsArr.splice(start, 1)[0];
  // widgetsArr.splice(end, 0, widgetToBeMoved);
  // console.log("The reorderd widgets are: " + widgetsArr);
  //
  // // add the widgets back in the widgets array
  // for (key in widgetsArr) {
  //   widgets.push(widgetsArr[key]);
  // }
  // console.log("The newly sorted widget array is: " + widgets);
  // return res.sendStatus(200);
}

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
  console.log("The widget url is: " + widget[0].url);
  console.log("widget json is: " + widget[0]);
  widgetModel
    .updateWidget(widget[0].id, widget[0])
    .then(
      function (newWidget) {
        //callback(newWidget, res);
        if (newWidget) {
          console.log("New widget is: " + JSON.stringify(newWidget));
          console.log("callbackurl is: " + callbackUrl);
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

// gets some widget from an array of widgets based on wgid
// function getWidgetById(widgetId) {
//   widgetModel
//     .findWidgetById(widgetId)
//     .then(
//       function (err, widget) {
//         callback(err, widget, res);
//       }
//     );
// }

