var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

// declares and initializes all api's
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

// allows api's to be exported to some service layer
module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
  website._user = userId;
  return websiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
  return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
  return websiteModel.findById({_id: websiteId});
}

function updateWebsite(websiteId, website) {

}

function deleteWebsite(websiteId) {

}
