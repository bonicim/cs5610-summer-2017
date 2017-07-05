var app = require('../../express');

// temporary database
var pages = [{ "_id": "321", "name": "Post 1", "wid": "456", "description": "Lorem" },
  { "_id": "432", "name": "Post 2", "wid": "456", "description": "Lorem" },
  { "_id": "543", "name": "Post 3", "wid": "456", "description": "Lorem" }];

// POST
app.post('/api/website/:websiteId/page', createPage);

// GET
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);

// PUT
// URL = '/page/:pageId/widget?initial=index1&final=index2
// pageId: id of page whose widgets are being displayed
// initial: initial index of the widget being being reordered
// final: final index of widget after being reordered
app.put('/page/:pageId/widget', sortWidgets);
app.put('/api/page/:pageId', updatePage);

// DELETE
app.delete('/api/page/:pageId', deletePage);



// Implementations of event handlers
function createPage(req, res) {
    var page = req.body;
    var id = generateId();
    var pageToAdd = {
        id : id,
        name : page.name,
        wid : req.params.websiteId,
        description : page.description};
    pages.push(pageToAdd);
    return res.json(pageToAdd);
}

function generateId() {
    function getMaxId(maxId, page) {
        var currId = parseInt(page._id);
        if (maxId > currId) {
            return maxId;
        }
        else {
            return currId + 1;
        }
    }
    var uniqueId = pages.reduce(getMaxId, 0).toString();
    console.log("We generated a unique id. It is: " + uniqueId);
    return uniqueId;
}

function findAllPagesForWebsite(req, res) {
  var pagesResult = [];
  for (key in pages) {
    var page = pages[key];
    if (parseInt(page.wid) === parseInt(req.params.websiteId)) {
      pagesResult.push(page);
    }
  }
  return res.json(pagesResult);
}

function findPageById(req, res) {
  for (key in pages) {
    var page = pages[key];
    if (parseInt(page._id) === parseInt(req.params.pageId)) {
      return res.json(page);
    }
  }
  return res.status(404);
}

function updatePage(req, res) {
  for (key in pages) {
    var page = pages[key];
    if (parseInt(page._id) === parseInt(req.params.pageId)) {
      var pageToUpdate = {
        "_id" : page._id,
        "wid" : page.wid,
        "name": req.body.name,
        "description": req.body.description
      }
      pages[key] = pageToUpdate;
      return res.json(pageToUpdate);
    }
  }
  return res.sendStatus(404);
}

function deletePage(req, res) {

}

// this will be called by the widget client service to be able to sort the widgets
function sortWidgets(req, res) {

}