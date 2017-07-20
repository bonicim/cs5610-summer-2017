var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageSchema = require('../page/page.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = mongoose.model('PageModel', pageSchema);

// declares and initializes all api's
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

// allows api's to be exported to some service layer
module.exports = widgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return widgetModel.create(widget)
    .then(
      function (widget) {
        pageModel.insertWidget(pageId, widget._id);
        return widget;
      }
    )
    .catch(
      function (err) {
        console.log("Failed to create widget", err);
        return null;
      }
    );
}

function findAllWidgetsForPage(pageId) {
  return pageModel
    .findAllWidgetsByPageId(pageId);
}

function findWidgetById(widgetId) {
  return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
  return widgetModel
    .findByIdAndRemove({'_id': widgetId})
    .then(
      function (widget) {
        pageModel.deleteWidget(pageId, widgetId)
        return widget;
      }

      // needs the page id and widget id to do the delete
    )
    .catch(
      function (err) {
        console.log("Error in deleting widget", err);
        return null;
      }
    );
}

function reorderWidget(pageId, start, end) {


}

  // return widgetModel
  //   .findAllWidgetsForPage({_id: pageId})
  //   .then(
  //     function (widgets) {
  //       if (widgets) {
  //         var counter = 0;
  //         var widgetToBeMoved = undefined;
  //         // get the widget to be moved
  //         for (key in widgets) {
  //           if ( parseInt(counter) === parseInt(start)) {
  //             widgetToBeMoved = widgets[key];
  //             break;
  //           }
  //           counter = counter + 1;
  //         }
  //
  //         // check to make sure widgetToBeMoved is not null
  //         console.log("Widget to be moved is: " + widgetToBeMoved);
  //
  //         widgetModel
  //           .findByIdAndRemove({_id: widgetToBeMoved._id})
  //           .then(
  //             function () {
  //               widgetModel
  //                 .create(widgetToBeMoved)
  //
  //
  //             }
  //           )
  //           .catch(
  //             function (err) {
  //               return null;
  //             }
  //           )
  //
  //         // get the widget at start (some find call)
  //         //store the widget somewhere
  //         // delete the widget at start (delete)
  //         //insert the widget at end (create)
  //       }
  //       else {
  //         return null;
  //       }
  //
  //     }
  //   )
  //   .catch(function (err) {
  //     return null;
  //   })

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

  // find all the widgets for the pageId
  //
