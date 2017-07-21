var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteSchema = require('../website/website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

// declares and initializes all api's
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.insertWidget = insertWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.findAllWidgetsByPageId = findAllWidgetsByPageId;
pageModel.reorderWidgetArrByPage = reorderWidgetArrByPage;

// allows api's to be exported to some service layer
module.exports = pageModel;

// TODO: consider doing virtual ordering
function reorderWidgetArrByPage(pageId, start, end) {
  return pageModel
    .findById({'_id': pageId})
    .then(function (page) {
      console.log("Current order of widgets: ", page.widgets);
      console.log("start and end", start, end);
      var widgetToBeMoved = page.widgets.splice(start,1)[0]; // remove the widget at start
      console.log("widgettobemoved: ", widgetToBeMoved);
      page.widgets.splice(end,0,widgetToBeMoved); // move the widget to end
      page.save()
      console.log("Order changed: ", page.widgets);
      return page.widgets;
      }
    );
}

function findAllWidgetsByPageId(pageId) {
  return pageModel
    .findById({'_id': pageId})
    .populate('widgets') // turns widget references into actual widgets and maintains order
    .exec()
    .then(function (page) {
      return page.widgets; // grabs only the widgets array of the page
    });
}

function deleteWidget(pageId, widgetId) {
  return pageModel
    .findById({'_id': pageId})
    .then(
      function (page) {
        if (page) {
          page.widgets.pull({_id: widgetId});
          return page.save();
        }
        else {
          console.log("Pages array is empty and page could not be found.");
          return null;
        }
      }
    )
    .catch(
      function (err) {
        console.log("Could not find page.", err);
        return null;
      }
    )

}

function insertWidget(pageId, widgetId) {
  return pageModel
    .findById({'_id': pageId})
    .then(
      function (page) {
        if (page) {
          page.widgets.push(widgetId);
          return page.save();
        }
        else {
          console.log("Pages array is empty and page could not be found.");
          return null;
        }
      }
    )
    .catch(
      function (err) {
        console.log("Could not find page.", err);
        return null;
      }
    )
}

function createPage(websiteId, page) {
  // TODO: must update website's pages array
  // copy widget create method
  // create the item
  // insert the item into the parent's references of children

  page._website = websiteId;
  return pageModel.create(page)
    .then(function (item) {
      websiteModel.insertPageToWebsite(item._id, websiteId);
      return item;
    })
    .catch(function (err) {
      console.log("Page not created: ", err);
      return null;
    });
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({'_website': websiteId});
}

function findPageById(pageId) {
  return pageModel.find({'_id': pageId});
}

function updatePage(pageId, page) {
  return pageModel.update({'_id': pageId}, {$set: page});
}

function deletePage(pageId) {
  return pageModel.findByIdAndRemove({'_id': pageId});
}