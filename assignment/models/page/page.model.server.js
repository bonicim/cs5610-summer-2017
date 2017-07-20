var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

// declares and initializes all api's
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.insertWidget = insertWidget;

// allows api's to be exported to some service layer
module.exports = pageModel;

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
  page._website = websiteId;
  return pageModel.create(page);
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