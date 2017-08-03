var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var userSchema = require('../user/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

// declares and initializes all api's
pageModel.createPage = createPage;
pageModel.createPrivatePage = createPrivatePage;
pageModel.createPublicPage = createPublicPage;
pageModel.findAllPagesForUser = findAllPagesForUser;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.insertWidget = insertWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.findAllWidgetsByPageId = findAllWidgetsByPageId;

// allows api's to be exported to some service layer
module.exports = pageModel;
