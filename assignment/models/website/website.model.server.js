var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userSchema = require('../user/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

// declares and initializes all api's
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.insertPageToWebsite = insertPageToWebsite;
websiteModel.deletePageInWebsite = deletePageInWebsite;

// allows api's to be exported to some service layer
module.exports = websiteModel;

function deletePageInWebsite(pageId, websiteId) {
  return websiteModel
    .findById({'_id': websiteId})
    .then(function (website) {
      if (website) {
        website.pages.pull({'_id': pageId})
        return website.save();
      }
      else {
        console.log("Website array is empty and page could not be found.");
        return null;
      }
    })
    .catch(
      function (err) {
        console.log("Could not find website.", err);
        return null;
      }
    )
}

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
  return websiteModel.create(website)
    .then(function (newWebsite) {
      userModel.addWebsiteToUser(userId, newWebsite._id);
      return newWebsite;
    })
    .catch(function (err) {
      console.log("Website not created: ", err);
      return null;
    });
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

function deleteWebsite(websiteId, userId) {
  return websiteModel.findByIdAndRemove({'_id': websiteId})
    .then(function(website) {
      userModel
        .deleteWebsiteInUser(websiteId, userId)
        .then(function (data) {
          return data;
        })
        .catch(function (err) {
          console.log("Could not delete the website reference contained in user: ", err);
          return null;
        });
      return website
    });
}
