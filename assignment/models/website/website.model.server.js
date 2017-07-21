var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

// declares and initializes all api's
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.insertPageToWebsite = insertPageToWebsite;

// allows api's to be exported to some service layer
module.exports = websiteModel;

function insertPageToWebsite(pageId, websiteId) {
  // get the website object
  // push the pageId to the pages array
  return websiteModel
    .findById({'_id': websiteId})
    .then(function (website) {
      if (website) {
        website.pages.push(pageId);
        return website.save();
      }
      else {
        console.log("Website is null");
        return null;
      }
    })
    .catch( function (err) {
      console.log("Could not execute database call: ", err);
      return null;
    })
}

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
  return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
  return websiteModel.findByIdAndRemove({'_id': websiteId});
}
