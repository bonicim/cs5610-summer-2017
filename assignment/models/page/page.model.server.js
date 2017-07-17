var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

// declares and initializes all api's
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

// allows api's to be exported to some service layer
module.exports = pageModel;

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