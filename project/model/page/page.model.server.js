var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var userSchema = require('../user/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

// declares and initializes all api's
pageModel.createPage = createPage;
pageModel.findAllPagesForUser = findAllPagesForUser;
pageModel.getActualWidgetsForPage = getActualWidgetsForPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.insertWidget = insertWidget;
pageModel.deleteWidget = deleteWidget;

// allows api's to be exported to some service layer
module.exports = pageModel;

function createPage(userId, page) {
  page._user = userId;
  return pageModel.create(page)
    .then(function (createdPage) {
      userModel.addPageToUser(createdPage._id, userId);
      return createdPage;
    })
    .catch(function (err) {
      console.log("Page not created: ", err);
      return null;
    });
}

function findAllPagesForUser(userId) {
  return pageModel.find({'_user': userId});
}

// this method is necessary because pages hold references to widgets
// thus to get the actual widgets of a page, we need to turn those
// widget references into actual widgets
function getActualWidgetsForPage(pageId) {
  return pageModel
    .findById({'_id': pageId})
    .populate('widgets') // turns widget references into actual widgets for the page object
    .exec()
    .then(function (page) {
      return page.widgets; // gets array of actual widgets
    });
}

function findPageById(pageId) {
  return pageModel.findOne({'_id': pageId});
}

function updatePage(pageId, page) {
  return pageModel.update({'_id': pageId}, {$set: page});
}

function deletePage(pageId) {
  return pageModel.findOne({'_id': pageId})
    .then(function (page) {
      // delete all the widgets associated with the page
      return widgetModel.deleteWidgetsByPageId(page._id);
    })
    .catch(function (err) {
      console.log("Failed to find the page or delete widgets associated with page", err);
      return err;
    })
    .then(function () {
      return pageModel.remove({'_id': pageId});
    })
    .catch(function (err) {
      console.log("Failed to delete page", err);
      return err;
    });
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




