var app = require('../../express');
var pageModel = require('../models/page/page.model.server')

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

// Implementations of event handlers
function createPage(req, res) {
  var page = req.body;
  var websiteId = req.params.websiteId;
  pageModel
    .createPage(websiteId, page)
    .then(
      function(err, page) {
        if (err) {
          res.send(err);
        }
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Bad input. Page not created.");
        }
      }
    );
}

function findAllPagesForWebsite(req, res) {
  var websiteId = req.params.websiteId;
  pageModel
    .findAllPagesForWebsite(websiteId)
    .then(
      function(err, page) {
        if (err) {
          res.send(err);
        }
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Bad input. Pages not found.");
        }
      }
    );
}

function findPageById(req, res) {
  var pageId = req.params.pageId;
  pageModel
    .findPageById(pageId)
    .then(
      function(err, page) {
        if (err) {
          res.send(err);
        }
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Bad input. Page not found.");
        }
      }
    );
}

function updatePage(req, res) {
  var pageId = req.params.pageId;
  var page = req.body;
  pageModel
    .updatePage(pageId, page)
    .then(
      function(err, page) {
        if (err) {
          res.send(err);
        }
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Bad input. Page not update.");
        }
      }
    );
}

function deletePage(req, res) {
  var pageId = req.params.pageId;
  pageModel
    .deletePage(pageId)
    .then(
      function(err, page) {
        if (err) {
          res.send(err);
        }
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Bad input. Page not deleted.");
        }
      }
    );
}

